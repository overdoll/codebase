package adapters

import (
	"context"
	"errors"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"sort"
	"time"
)

const (
	maxClubMembersPerPartition     = 10000
	initialClubMembersPartitions   = 1
	incrementClubMembersPartitions = 1
)

var (
	ErrNoValidPartitionFound = errors.New("no valid partition to place club member into")
)

var accountSupportedClubsTable = table.New(table.Metadata{
	Name: "account_supported_clubs",
	Columns: []string{
		"account_id",
		"club_id",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"club_id"},
})

type accountSupportedClubs struct {
	ClubId    string `db:"club_id"`
	AccountId string `db:"account_id"`
}

var clubMembersTable = table.New(table.Metadata{
	Name: "club_members",
	Columns: []string{
		"club_id",
		"bucket",
		"member_account_id",
		"joined_at",
		"is_supporter",
		"supporter_since",
		"deleted",
	},
	PartKey: []string{"club_id", "member_account_id"},
	SortKey: []string{},
})

type clubMember struct {
	ClubId          string     `db:"club_id"`
	Bucket          gocql.UUID `db:"bucket"`
	MemberAccountId string     `db:"member_account_id"`
	JoinedAt        gocql.UUID `db:"joined_at"`
	IsSupporter     bool       `db:"is_supporter"`
	SupporterSince  *time.Time `db:"supporter_since"`
	Deleted         bool       `db:"deleted"`
}

var clubMembersByAccountTable = table.New(table.Metadata{
	Name: "club_members_by_account",
	Columns: []string{
		"club_id",
		"bucket",
		"member_account_id",
		"joined_at",
		"is_supporter",
		"supporter_since",
	},
	PartKey: []string{"member_account_id"},
	SortKey: []string{"joined_at", "club_id"},
})

type clubMembersByAccount struct {
	ClubId          string     `db:"club_id"`
	Bucket          gocql.UUID `db:"bucket"`
	MemberAccountId string     `db:"member_account_id"`
	JoinedAt        gocql.UUID `db:"joined_at"`
	IsSupporter     bool       `db:"is_supporter"`
	SupporterSince  *time.Time `db:"supporter_since"`
}

var clubMembersByClubTable = table.New(table.Metadata{
	Name: "club_members_by_club",
	Columns: []string{
		"club_id",
		"bucket",
		"member_account_id",
		"joined_at",
		"is_supporter",
		"supporter_since",
	},
	PartKey: []string{"club_id", "bucket"},
	SortKey: []string{"joined_at", "member_account_id"},
})

type clubMemberByClub struct {
	ClubId          string     `db:"club_id"`
	Bucket          gocql.UUID `db:"bucket"`
	MemberAccountId string     `db:"member_account_id"`
	JoinedAt        gocql.UUID `db:"joined_at"`
	IsSupporter     bool       `db:"is_supporter"`
	SupporterSince  *time.Time `db:"supporter_since"`
}

var clubMembersPartitionsTable = table.New(table.Metadata{
	Name: "club_members_partitions",
	Columns: []string{
		"club_id",
		"bucket",
		"last_joined_at_count",
		"members_count",
		"max_members_count",
	},
	PartKey: []string{"club_id"},
	SortKey: []string{"bucket"},
})

type clubMembersPartition struct {
	ClubId            string     `db:"club_id"`
	Bucket            gocql.UUID `db:"bucket"`
	LastJoinedAtCount gocql.UUID `db:"last_joined_at_count"`
	MembersCount      int        `db:"members_count"`
	MaxMembersCount   int        `db:"max_members_count"`
}

func (r ClubCassandraRepository) addClubPartitions(ctx context.Context, clubId string) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := clubMembersPartitionsTable.Insert()

	// create partitions based on increment
	for i := 0; i <= incrementClubMembersPartitions; i++ {
		tm := gocql.TimeUUID()
		batch.Query(stmt, clubId, tm, tm, 0, maxClubMembersPerPartition)
	}

	if err := r.session.ExecuteBatch(batch); err != nil {
		return err
	}

	return nil
}

func (r ClubCassandraRepository) addInitialClubPartitionInsertsToBatch(ctx context.Context, batch *gocql.Batch, clubId string) (gocql.UUID, error) {

	stmt, _ := clubMembersPartitionsTable.Insert()

	var firstPartition gocql.UUID

	// initially, make 10 partitions with a maximum member count of x members per partition
	// will expand when partitions begin to fill up
	for i := 0; i <= initialClubMembersPartitions; i++ {

		tm := gocql.TimeUUID()

		if i == 0 {
			firstPartition = tm
			batch.Query(stmt, clubId, tm, tm, 1, maxClubMembersPerPartition)
		} else {
			batch.Query(stmt, clubId, tm, tm, 0, maxClubMembersPerPartition)
		}

	}

	// also return the first partition to be used
	return firstPartition, nil
}

func (r ClubCassandraRepository) addInitialClubMemberToBatch(ctx context.Context, batch *gocql.Batch, clubId, accountId string, partition gocql.UUID) error {

	stmt, _ := clubMembersTable.Insert()

	batch.Query(stmt, clubId, partition, accountId, partition, true, partition.Time(), false)

	// insert into account's club list
	stmt, _ = clubMembersByAccountTable.Insert()
	batch.Query(stmt, clubId, partition, accountId, partition, true, partition.Time())

	// insert into club members list
	stmt, _ = clubMembersByClubTable.Insert()
	batch.Query(stmt, clubId, partition, accountId, partition, true, partition.Time())

	// insert into account's supported clubs
	stmt, _ = accountSupportedClubsTable.Insert()
	batch.Query(stmt, accountId, clubId)

	return nil
}

func (r ClubCassandraRepository) updateClubMembersPartitionCount(ctx context.Context, clubId string, bucket gocql.UUID, fresh bool) error {

	// first, grab the partition to get the last timestamp count
	var partition clubMembersPartition

	if err := r.session.
		Query(clubMembersPartitionsTable.Get()).
		BindStruct(clubMembersPartition{ClubId: clubId, Bucket: bucket}).
		Get(&partition); err != nil {
		return fmt.Errorf("failed to get club by id: %v", err)
	}

	builder := clubMembersByClubTable.
		SelectBuilder()

	clubMemberItem := clubMemberByClub{
		ClubId: partition.ClubId,
		Bucket: partition.Bucket,
	}

	if !fresh {
		builder.Where(qb.Gt("joined_at"))
		clubMemberItem.JoinedAt = partition.LastJoinedAtCount
	}

	// then, using the last timestamp, count the number of new rows since then
	type clubMemberCountStruct struct {
		MaxJoinedAt *gocql.UUID `db:"system.max(joined_at)"`
		Count       int         `db:"count"`
	}

	var clubMemberCounter clubMemberCountStruct

	if err := builder.
		CountAll().
		Max("joined_at").
		Query(r.session).
		BindStruct(clubMemberItem).
		Get(&clubMemberCounter); err != nil {
		return fmt.Errorf("failed to count: %v", err)
	}

	partBuilder := clubMembersPartitionsTable.
		UpdateBuilder().
		Set("last_joined_at_count", "members_count")

	lastCountTimestamp := clubMemberCounter.MaxJoinedAt

	// timestamp might be 0 because there are no records in the table, so we set the last_joined_at to
	if lastCountTimestamp == nil {
		tm := gocql.UUIDFromTime(time.Now())
		lastCountTimestamp = &tm
	}

	clubPartItem := clubMembersPartition{
		ClubId:            partition.ClubId,
		Bucket:            partition.Bucket,
		LastJoinedAtCount: *lastCountTimestamp,
	}

	if !fresh {
		clubPartItem.MembersCount = clubMemberCounter.Count + partition.MembersCount
		// make sure we don't overwrite anything
		partBuilder.If(qb.EqLit("last_joined_at_count", partition.LastJoinedAtCount.String()))

		applied, err := partBuilder.
			Query(r.session).
			BindStruct(clubPartItem).
			ExecCAS()

		if err != nil {
			return fmt.Errorf("failed to update count: %v", err)
		}

		// if it didn't apply, the count we were gonna update is outdated and we don't have to worry about anything
		if !applied {
			return nil
		}

		return nil

	}

	clubPartItem.MembersCount = clubMemberCounter.Count

	// do an overwritten query since we are updating the "total" count here
	if applied, err := partBuilder.
		Existing().
		Query(r.session).
		BindStruct(clubPartItem).
		ExecCAS(); err != nil || !applied {

		if err != nil {
			return fmt.Errorf("failed to update count: %v", err)
		}

		return fmt.Errorf("failed to update count")
	}

	return nil
}

func (r ClubCassandraRepository) getNextClosestEmptyClubMembersPartition(ctx context.Context, clubId string) (*clubMembersPartition, error) {

	var partitions []clubMembersPartition

	if err := r.session.
		Query(clubMembersPartitionsTable.Select()).
		Consistency(gocql.One).
		BindStruct(clubMembersPartition{ClubId: clubId}).
		Select(&partitions); err != nil {

		return nil, fmt.Errorf("failed to get club by id: %v", err)
	}

	// sort by highest to lowest membersCount
	sort.Slice(partitions, func(i, j int) bool {
		return partitions[i].MembersCount > partitions[j].MembersCount
	})

	var targetPartition *clubMembersPartition

	// go through each partition and find the next partition that hasn't reached the max count
	for _, partition := range partitions {
		if partition.MaxMembersCount > partition.MembersCount {
			targetPartition = &partition
			break
		}
	}

	// no valid partition found, error out
	if targetPartition == nil {
		return nil, ErrNoValidPartitionFound
	}

	return targetPartition, nil
}

func (r ClubCassandraRepository) CreateClubMember(ctx context.Context, member *club.Member) error {

	// get the next partition that is valid
	partition, err := r.getNextClosestEmptyClubMembersPartition(ctx, member.ClubId())

	if err != nil {
		return err
	}

	if err := r.session.
		Query(clubMembersTable.Insert()).
		BindStruct(clubMember{
			ClubId:          member.ClubId(),
			Bucket:          partition.Bucket,
			MemberAccountId: member.AccountId(),
			JoinedAt:        gocql.UUIDFromTime(member.JoinedAt()),
			IsSupporter:     member.IsSupporter(),
			SupporterSince:  member.SupporterSince(),
			Deleted:         false,
		}).
		ExecRelease(); err != nil {
		return err
	}

	return nil
}

func (r ClubCassandraRepository) getClubMemberById(ctx context.Context, clubId, accountId string) (*clubMember, error) {

	var clubMem clubMember

	if err := r.session.
		Query(clubMembersTable.Get()).
		Consistency(gocql.One).
		BindStruct(clubMember{ClubId: clubId, MemberAccountId: accountId}).
		Get(&clubMem); err != nil {

		if err == gocql.ErrNotFound {
			return nil, club.ErrClubMemberNotFound
		}

		return nil, fmt.Errorf("failed to get club member by id: %v", err)
	}

	return &clubMem, nil
}

func (r ClubCassandraRepository) deleteClubMemberById(ctx context.Context, clubId, accountId string) error {

	if err := r.session.
		Query(clubMembersTable.Delete()).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubMember{ClubId: clubId, MemberAccountId: accountId}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to get club member by id: %v", err)
	}

	return nil
}

func (r ClubCassandraRepository) GetClubMemberByIdOperator(ctx context.Context, clubId, accountId string) (*club.Member, error) {

	clb, err := r.getClubMemberById(ctx, clubId, accountId)

	if err != nil {
		return nil, err
	}

	return club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt.Time(), clb.IsSupporter, clb.SupporterSince), nil
}

func (r ClubCassandraRepository) GetClubMemberById(ctx context.Context, requester *principal.Principal, clubId, accountId string) (*club.Member, error) {

	clb, err := r.getClubMemberById(ctx, clubId, accountId)

	if err != nil {
		return nil, err
	}

	// if deleted, return nil
	if clb.Deleted {
		return nil, club.ErrClubMemberNotFound
	}

	return club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt.Time(), clb.IsSupporter, clb.SupporterSince), nil
}

func (r ClubCassandraRepository) DeleteClubMember(ctx context.Context, requester *principal.Principal, clubId, accountId string) error {

	mclub, err := r.GetClubById(ctx, clubId)

	if err != nil {
		return err
	}

	clb, err := r.getClubMemberById(ctx, clubId, accountId)

	if err != nil {
		return err
	}

	clubMembership := club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt.Time(), clb.IsSupporter, clb.SupporterSince)

	if err := clubMembership.CanRevokeClubMembership(requester, mclub); err != nil {
		return err
	}

	if err := r.session.
		Query(clubMembersTable.Update("deleted")).
		BindStruct(clubMember{
			ClubId:          clubId,
			MemberAccountId: accountId,
			// we don't delete the club member, since we require the entry to delete it from the list, so we mark it as "deleted" and
			// the "client" will now see it as deleted while we do other background jobs
			Deleted: true,
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete club member by id: %v", err)
	}

	return nil
}

func (r ClubCassandraRepository) AddClubMemberToList(ctx context.Context, clubId, accountId string) error {

	clb, err := r.getClubMemberById(ctx, clubId, accountId)

	if err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// insert into account's club list
	stmt, _ := clubMembersByAccountTable.Insert()
	batch.Query(stmt, clb.ClubId, clb.Bucket, clb.MemberAccountId, clb.JoinedAt, clb.IsSupporter, clb.SupporterSince)

	// insert into club members list
	stmt, _ = clubMembersByClubTable.Insert()
	batch.Query(stmt, clb.ClubId, clb.Bucket, clb.MemberAccountId, clb.JoinedAt, clb.IsSupporter, clb.SupporterSince)

	// execute batch
	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to add member to list: %v", err)
	}

	// finally, also update the count
	return r.updateClubMembersPartitionCount(ctx, clb.ClubId, clb.Bucket, false)
}

func (r ClubCassandraRepository) UpdateClubMembersTotalCount(ctx context.Context, clubId string) error {

	// Grab the sum of all partitions counters
	type clubMembersPartitionSum struct {
		SumMembersCount    int `db:"system.sum(members_count)"`
		SumMaxMembersCount int `db:"system.sum(max_members_count)"`
	}

	var clubMembersPartitionSums clubMembersPartitionSum

	if err := clubMembersPartitionsTable.
		SelectBuilder().
		Sum("members_count").
		Sum("max_members_count").
		Query(r.session).
		BindStruct(clubMemberByClub{
			ClubId: clubId,
		}).
		Get(&clubMembersPartitionSums); err != nil {
		return fmt.Errorf("failed to get club by id: %v", err)
	}

	// partition more than half full, insert new partitions
	if float64(clubMembersPartitionSums.SumMaxMembersCount)/float64(clubMembersPartitionSums.SumMembersCount) >= 0.5 {
		if err := r.addClubPartitions(ctx, clubId); err != nil {
			return err
		}
	}

	// update club member count
	return r.updateClubMemberCount(ctx, clubId, clubMembersPartitionSums.SumMembersCount)
}

func (r ClubCassandraRepository) GetAccountClubMembershipsOperator(ctx context.Context, accountId string) ([]*club.Member, error) {

	var accountClubs []*clubMembersByAccount

	if err := clubMembersByAccountTable.
		SelectBuilder().
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubMembersByAccount{
			MemberAccountId: accountId,
		}).
		Select(&accountClubs); err != nil {
		return nil, fmt.Errorf("failed to get account clubs by account: %v", err)
	}

	var members []*club.Member

	for _, clb := range accountClubs {
		members = append(members, club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt.Time(), clb.IsSupporter, clb.SupporterSince))
	}

	return members, nil
}

func (r ClubCassandraRepository) GetAccountClubMemberships(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*club.Member, error) {

	if err := club.CanViewAccountClubMemberships(requester, accountId); err != nil {
		return nil, err
	}

	builder := clubMembersByAccountTable.SelectBuilder()

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "joined_at", true); err != nil {
			return nil, err
		}
	}

	var accountClubs []*clubMembersByAccount

	if err := builder.Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubMembersByAccount{
			MemberAccountId: accountId,
		}).
		Select(&accountClubs); err != nil {
		return nil, fmt.Errorf("failed to get account clubs by account: %v", err)
	}

	var members []*club.Member

	for _, clb := range accountClubs {
		em := club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt.Time(), clb.IsSupporter, clb.SupporterSince)
		em.Node = paging.NewNode(clb.JoinedAt.String())
		members = append(members, em)
	}

	return members, nil
}

func (r ClubCassandraRepository) GetAccountClubMembershipsCount(ctx context.Context, requester *principal.Principal, accountId string) (int, error) {

	if err := club.CanViewAccountClubMemberships(requester, accountId); err != nil {
		return 0, err
	}

	type accountClubMembersCount struct {
		Count int `db:"count"`
	}

	var clubMembersCount accountClubMembersCount

	if err := clubMembersByAccountTable.
		SelectBuilder().
		CountAll().
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubMembersByAccount{
			MemberAccountId: accountId,
		}).
		Get(&clubMembersCount); err != nil {
		return 0, fmt.Errorf("failed to get account clubs by account: %v", err)
	}

	return clubMembersCount.Count, nil
}

func (r ClubCassandraRepository) RemoveClubMemberFromlist(ctx context.Context, clubId, accountId string) error {

	clb, err := r.getClubMemberById(ctx, clubId, accountId)

	if err != nil {
		return err
	}

	if !clb.Deleted {
		return errors.New("ran delete when delete was not requested")
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// delete from account's club list
	stmt, _ := clubMembersByAccountTable.Delete()
	batch.Query(stmt, clb.MemberAccountId, clb.JoinedAt, clb.ClubId)

	// delete from club members list
	stmt, _ = clubMembersByClubTable.Delete()
	batch.Query(stmt, clb.ClubId, clb.Bucket, clb.JoinedAt, clb.MemberAccountId)

	// execute batch
	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to delete member from lists: %v", err)
	}

	// update the count - don't use the previous timestamp and instead do a fresh count (we need to consider removed records)
	if err := r.updateClubMembersPartitionCount(ctx, clb.ClubId, clb.Bucket, true); err != nil {
		return err
	}

	// delete the final record
	return r.deleteClubMemberById(ctx, clubId, accountId)
}

func (r ClubCassandraRepository) GetMembersForClub(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, clubId string) ([]*club.Member, error) {

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	var partitions []clubMembersPartition

	if err := clubMembersPartitionsTable.
		SelectBuilder().
		Query(r.session).
		BindStruct(clubMembersPartition{
			ClubId: clubId,
		}).
		Select(&partitions); err != nil {
		return nil, fmt.Errorf("failed to get partitions: %v", err)
	}

	if len(partitions) == 0 {
		return nil, errors.New("no partitions found for grabbing members")
	}

	var afterValue gocql.UUID
	if cursor.After() != nil {
		if err := cursor.After().Decode(&afterValue); err != nil {
			return nil, err
		}
	}

	var beforeValue gocql.UUID
	if cursor.Before() != nil {
		if err := cursor.Before().Decode(&beforeValue); err != nil {
			return nil, err
		}
	}

	var members []*club.Member

	for _, partition := range partitions {

		builder := clubMembersByClubTable.
			SelectBuilder()

		if err := cursor.BuildCassandra(builder, "joined_at", true); err != nil {
			return nil, err
		}

		memberClubLookup := clubMemberByClub{
			ClubId: partition.ClubId,
			Bucket: partition.Bucket,
		}

		if cursor.Before() != nil {
			memberClubLookup.JoinedAt = beforeValue
		}

		if cursor.After() != nil {
			memberClubLookup.JoinedAt = afterValue
		}

		var clubMembers []clubMemberByClub

		// then, using the last timestamp, count the number of new rows since then
		if err := builder.
			Query(r.session).
			BindStruct(memberClubLookup).
			Select(&clubMembers); err != nil {
			return nil, fmt.Errorf("failed to get club members: %v", err)
		}

		for _, member := range clubMembers {
			em := club.UnmarshalMemberFromDatabase(member.MemberAccountId, member.ClubId, member.JoinedAt.Time(), member.IsSupporter, member.SupporterSince)
			members = append(members, em)
			em.Node = paging.NewNode(member.JoinedAt)
		}

		if len(members) >= cursor.GetLimit() {
			break
		}
	}

	return members, nil
}

func (r ClubCassandraRepository) UpdateClubMemberIsSupporter(ctx context.Context, clubId, accountId string, updateFn func(member *club.Member) error) (*club.Member, error) {

	clb, err := r.getClubMemberById(ctx, clubId, accountId)

	if err != nil {
		return nil, err
	}

	currentClub := club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt.Time(), clb.IsSupporter, clb.SupporterSince)

	err = updateFn(currentClub)

	if err != nil {
		return nil, err
	}

	clb = &clubMember{
		ClubId:          currentClub.ClubId(),
		Bucket:          clb.Bucket,
		MemberAccountId: clb.MemberAccountId,
		JoinedAt:        clb.JoinedAt,
		IsSupporter:     currentClub.IsSupporter(),
		SupporterSince:  currentClub.SupporterSince(),
		Deleted:         false,
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := clubMembersByAccountTable.Update("is_supporter", "supporter_since")
	batch.Query(stmt, clb.IsSupporter, clb.SupporterSince, clb.MemberAccountId, clb.JoinedAt, clb.ClubId)

	stmt, _ = clubMembersByClubTable.Update("is_supporter", "supporter_since")
	batch.Query(stmt, clb.IsSupporter, clb.SupporterSince, clb.ClubId, clb.Bucket, clb.JoinedAt, clb.MemberAccountId)

	stmt, _ = clubMembersTable.Update("is_supporter", "supporter_since")
	batch.Query(stmt, clb.IsSupporter, clb.SupporterSince, clb.ClubId, clb.MemberAccountId)

	if clb.IsSupporter {
		stmt, _ = accountSupportedClubsTable.Insert()
		batch.Query(stmt, clb.MemberAccountId, clb.ClubId)
	} else {
		stmt, _ = accountSupportedClubsTable.Delete()
		batch.Query(stmt, clb.MemberAccountId, clb.ClubId)
	}

	// execute batch
	if err := r.session.ExecuteBatch(batch); err != nil {
		return nil, fmt.Errorf("failed to update club supporter status: %v", err)
	}

	return currentClub, nil
}

func (r ClubCassandraRepository) GetAccountSupportedClubs(ctx context.Context, accountId string) ([]string, error) {

	var supportedClubs []*accountSupportedClubs

	if err := accountSupportedClubsTable.
		SelectBuilder().
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountSupportedClubs{
			AccountId: accountId,
		}).
		Select(&supportedClubs); err != nil {
		return nil, fmt.Errorf("failed to get account supported clubs: %v", err)
	}

	var supportedIds []string

	for _, supported := range supportedClubs {
		supportedIds = append(supportedIds, supported.ClubId)
	}

	return supportedIds, nil
}
