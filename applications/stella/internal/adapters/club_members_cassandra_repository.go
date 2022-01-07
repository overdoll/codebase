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
	maxClubMembersPerPartition   = 25000
	initialClubMembersPartitions = 10
)

var (
	ErrNoValidPartitionFound = errors.New("no valid partition to place club member into")
)

var clubMembersTable = table.New(table.Metadata{
	Name: "club_members",
	Columns: []string{
		"club_id",
		"bucket",
		"member_account_id",
		"joined_at",
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
	Deleted         bool       `db:"deleted"`
}

var clubMembersByAccountTable = table.New(table.Metadata{
	Name: "club_members_by_account",
	Columns: []string{
		"club_id",
		"bucket",
		"member_account_id",
		"joined_at",
	},
	PartKey: []string{"member_account_id"},
	SortKey: []string{"joined_at", "club_id"},
})

type clubMembersByAccount struct {
	ClubId          string     `db:"club_id"`
	Bucket          gocql.UUID `db:"bucket"`
	MemberAccountId string     `db:"member_account_id"`
	JoinedAt        gocql.UUID `db:"joined_at"`
}

var clubMembersByClubTable = table.New(table.Metadata{
	Name: "club_members_by_club",
	Columns: []string{
		"club_id",
		"bucket",
		"member_account_id",
		"joined_at",
	},
	PartKey: []string{"club_id", "bucket"},
	SortKey: []string{"joined_at", "member_account_id"},
})

type clubMemberByClub struct {
	ClubId          string     `db:"club_id"`
	Bucket          gocql.UUID `db:"bucket"`
	MemberAccountId string     `db:"member_account_id"`
	JoinedAt        gocql.UUID `db:"joined_at"`
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

func (r ClubCassandraRepository) addInitialClubPartitionInsertsToBatch(ctx context.Context, batch *gocql.Batch, clubId string) error {

	stmt, _ := clubMembersPartitionsTable.Insert()

	// initially, make 10 partitions with a maximum member count of x members per partition
	// will expand when partitions begin to fill up
	for i := 0; i <= initialClubMembersPartitions; i++ {
		batch.Query(stmt, clubId, gocql.TimeUUID(), gocql.TimeUUID(), 0, maxClubMembersPerPartition)
	}

	return nil
}

func (r ClubCassandraRepository) updateClubMembersPartitionCount(ctx context.Context, clubId string, bucket gocql.UUID, fresh bool) error {

	// first, grab the partition to get the last timestamp count
	queryPartitions := r.session.
		Query(clubMembersPartitionsTable.Get()).
		BindStruct(clubMembersPartition{ClubId: clubId, Bucket: bucket})

	var partition clubMembersPartition

	if err := queryPartitions.Get(&partition); err != nil {
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
	getCurrentCount := builder.
		CountAll().
		Max("joined_at").
		Query(r.session).
		BindStruct(clubMemberItem)

	type clubMemberCountStruct struct {
		MaxJoinedAt *gocql.UUID `db:"system.max(joined_at)"`
		Count       int         `db:"count"`
	}

	var clubMemberCounter clubMemberCountStruct

	if err := getCurrentCount.Get(&clubMemberCounter); err != nil {
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
	if err := partBuilder.
		Query(r.session).
		BindStruct(clubPartItem).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to update count: %v", err)
	}

	return nil
}

func (r ClubCassandraRepository) getNextClosestEmptyClubMembersPartition(ctx context.Context, clubId string) (*clubMembersPartition, error) {

	queryPartitions := r.session.
		Query(clubMembersPartitionsTable.Select()).
		Consistency(gocql.One).
		BindStruct(clubMembersPartition{ClubId: clubId})

	var partitions []clubMembersPartition

	if err := queryPartitions.Select(&partitions); err != nil {

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

func (r ClubCassandraRepository) CreateClubMember(ctx context.Context, requester *principal.Principal, member *club.Member) error {

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
			Deleted:         false,
		}).
		ExecRelease(); err != nil {
		return err
	}

	return nil
}

func (r ClubCassandraRepository) getClubMemberById(ctx context.Context, clubId, accountId string) (*clubMember, error) {

	queryMember := r.session.
		Query(clubMembersTable.Get()).
		Consistency(gocql.One).
		BindStruct(clubMember{ClubId: clubId, MemberAccountId: accountId})

	var clubMem clubMember

	if err := queryMember.Get(&clubMem); err != nil {

		if err == gocql.ErrNotFound {
			return nil, club.ErrClubMemberNotFound
		}

		return nil, fmt.Errorf("failed to get club member by id: %v", err)
	}

	return &clubMem, nil
}

func (r ClubCassandraRepository) deleteClubMemberById(ctx context.Context, clubId, accountId string) error {

	queryMember := r.session.
		Query(clubMembersTable.Delete()).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubMember{ClubId: clubId, MemberAccountId: accountId})

	if err := queryMember.ExecRelease(); err != nil {
		return fmt.Errorf("failed to get club member by id: %v", err)
	}

	return nil
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

	return club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt.Time()), nil
}

func (r ClubCassandraRepository) DeleteClubMember(ctx context.Context, requester *principal.Principal, clubId, accountId string) error {

	deleteMember := r.session.
		Query(clubMembersTable.Update("deleted")).
		BindStruct(clubMember{
			ClubId:          clubId,
			MemberAccountId: accountId,
			// we don't delete the club member, since we require the entry to delete it from the list, so we mark it as "deleted" and
			// the "client" will now see it as deleted while we do other background jobs
			Deleted: true,
		})

	if err := deleteMember.ExecRelease(); err != nil {
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
	batch.Query(stmt, clb.ClubId, clb.Bucket, clb.MemberAccountId, clb.JoinedAt)

	// insert into club members list
	stmt, _ = clubMembersByClubTable.Insert()
	batch.Query(stmt, clb.ClubId, clb.Bucket, clb.MemberAccountId, clb.JoinedAt)

	// execute batch
	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to add member to list: %v", err)
	}

	// finally, also update the count
	return r.updateClubMembersPartitionCount(ctx, clb.ClubId, clb.Bucket, false)
}

func (r ClubCassandraRepository) UpdateClubMembersTotalCount(ctx context.Context, clubId string) error {

	// Grab the sum of all partitions counters
	getCurrentCount := clubMembersPartitionsTable.
		SelectBuilder().
		Sum("members_count").
		Query(r.session).
		BindStruct(clubMemberByClub{
			ClubId: clubId,
		})

	type clubMembersPartitionSum struct {
		SumMembersCount int `db:"system.sum(members_count)"`
	}

	var clubMembersPartitionSums clubMembersPartitionSum

	if err := getCurrentCount.Get(&clubMembersPartitionSums); err != nil {
		return fmt.Errorf("failed to get club by id: %v", err)
	}

	// update club member count
	return r.updateClubMemberCount(ctx, clubId, clubMembersPartitionSums.SumMembersCount)
}

func (r ClubCassandraRepository) GetAccountClubMemberships(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*club.Member, error) {

	if err := club.CanViewAccountClubMemberships(requester, accountId); err != nil {
		return nil, err
	}

	builder := clubMembersByAccountTable.SelectBuilder()

	if cursor != nil {
		cursor.BuildCassandra(builder, "joined_at")
	}

	queryClubMemberships := builder.Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubMembersByAccount{
			MemberAccountId: accountId,
		})

	var accountClubs []*clubMembersByAccount

	if err := queryClubMemberships.Select(&accountClubs); err != nil {
		return nil, fmt.Errorf("failed to get account clubs by account: %v", err)
	}

	var members []*club.Member

	for _, clb := range accountClubs {
		em := club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt.Time())
		members = append(members, em)
		em.Node = paging.NewNode(clb.JoinedAt.String())
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

	queryAccountsCount := clubMembersByAccountTable.
		SelectBuilder().
		CountAll().
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubMembersByAccount{
			MemberAccountId: accountId,
		})

	if err := queryAccountsCount.Get(&clubMembersCount); err != nil {
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
	// get first partition
	getFirstPartition := clubMembersPartitionsTable.
		SelectBuilder().
		Limit(1).
		Query(r.session).
		BindStruct(clubMembersPartition{
			ClubId: clubId,
		})

	var partitions []clubMembersPartition

	if err := getFirstPartition.Select(&partitions); err != nil {
		return nil, fmt.Errorf("failed to get first partition: %v", err)
	}

	if len(partitions) != 1 {
		return nil, errors.New("no partitions found for grabbing members")
	}

	// get first partition
	partition := partitions[0]

	builder := clubMembersByClubTable.
		SelectBuilder()

	if cursor != nil {
		if cursor.After() != nil {
			builder.Where(qb.LtLit("joined_at", *cursor.After()))
		}

		if cursor.Before() != nil {
			builder.Where(qb.GtLit("joined_at", *cursor.Before()))
		}

		limit := cursor.GetLimit()

		if limit > 0 {
			builder.Limit(uint(limit))
		}
	}

	var clubMembers []clubMemberByClub

	// then, using the last timestamp, count the number of new rows since then
	getMembers := builder.
		Query(r.session).
		BindStruct(clubMemberByClub{
			ClubId: partition.ClubId,
			Bucket: partition.Bucket,
		})

	if err := getMembers.Select(&clubMembers); err != nil {
		return nil, fmt.Errorf("failed to get club members: %v", err)
	}

	var members []*club.Member

	for _, member := range clubMembers {
		em := club.UnmarshalMemberFromDatabase(member.MemberAccountId, member.ClubId, member.JoinedAt.Time())
		members = append(members, em)
		em.Node = paging.NewNode(member.JoinedAt.String())
	}

	return members, nil
}
