package adapters

import (
	"context"
	"errors"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/club"
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
	ClubId          string    `db:"club_id"`
	Bucket          string    `db:"bucket"`
	MemberAccountId string    `db:"member_account_id"`
	JoinedAt        time.Time `db:"joined_at"`
	Deleted         bool      `db:"deleted"`
}

var accountClubsTable = table.New(table.Metadata{
	Name: "account_clubs",
	Columns: []string{
		"club_id",
		"bucket",
		"member_account_id",
		"joined_at",
	},
	PartKey: []string{"member_account_id"},
	SortKey: []string{"joined_at", "club_id"},
})

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
	ClubId          string    `db:"club_id"`
	Bucket          string    `db:"bucket"`
	MemberAccountId string    `db:"member_account_id"`
	JoinedAt        time.Time `db:"joined_at"`
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
	ClubId            string    `db:"club_id"`
	Bucket            string    `db:"bucket"`
	LastJoinedAtCount time.Time `db:"last_joined_at_count"`
	MembersCount      int       `db:"members_count"`
	MaxMembersCount   int       `db:"max_members_count"`
}

func (r ClubCassandraRepository) updateClubMembersPartitionCount(ctx context.Context, clubId, bucket string) error {

	// first, grab the partition to get the last timestamp count
	queryPartitions := r.session.
		Query(clubMembersPartitionsTable.Get()).
		BindStruct(clubMembersPartition{ClubId: clubId, Bucket: bucket})

	var partition clubMembersPartition

	if err := queryPartitions.Get(&partition); err != nil {
		return fmt.Errorf("failed to get club by id: %v", err)
	}

	// then, using the last timestamp, count the number of new rows since then
	getCurrentCount := clubMembersByClubTable.
		SelectBuilder().
		Where(
			qb.Gt("joined_at"),
			qb.Eq("club_id"),
			qb.Eq("bucket"),
		).
		CountAll().
		Max("joined_at").
		Query(r.session).
		BindStruct(clubMemberByClub{
			ClubId:   partition.ClubId,
			Bucket:   partition.Bucket,
			JoinedAt: partition.LastJoinedAtCount,
		})

	type clubMemberCountStruct struct {
		MaxJoinedAt time.Time `db:"max(joined_at)"`
		Count       int       `db:"count"`
	}

	var clubMemberCounter clubMemberCountStruct

	if err := getCurrentCount.Get(&clubMemberCounter); err != nil {
		return fmt.Errorf("failed to get club by id: %v", err)
	}

	applied, err := clubMembersPartitionsTable.
		UpdateBuilder().
		Set("last_joined_at_count", "count").
		Where(
			qb.Eq("club_id"),
			qb.Eq("bucket"),
		).
		Query(r.session).
		BindStruct(clubMembersPartition{
			ClubId:            partition.ClubId,
			Bucket:            partition.Bucket,
			LastJoinedAtCount: clubMemberCounter.MaxJoinedAt,
			// update count with new one
			MembersCount: clubMemberCounter.Count + partition.MembersCount,
		}).
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
			JoinedAt:        member.JoinedAt(),
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

func (r ClubCassandraRepository) GetClubMemberById(ctx context.Context, requester *principal.Principal, clubId, accountId string) (*club.Member, error) {

	clb, err := r.getClubMemberById(ctx, clubId, accountId)

	if err != nil {
		return nil, err
	}

	// if deleted, return nil
	if clb.Deleted {
		return nil, club.ErrClubMemberNotFound
	}

	return club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt), nil
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
	stmt, _ := accountClubsTable.Insert()
	batch.Query(stmt, clb.MemberAccountId, clb.JoinedAt, clb.ClubId, clb.Bucket)

	// insert into club members list
	stmt, _ = clubMembersByClubTable.Insert()
	batch.Query(stmt, clb.ClubId, clb.Bucket, clb.JoinedAt, clb.MemberAccountId)

	// execute batch
	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to add member to list: %v", err)
	}

	// finally, also update the count
	return r.updateClubMembersPartitionCount(ctx, clb.ClubId, clb.Bucket)
}

func (r ClubCassandraRepository) UpdateClubMembersTotalCount(ctx context.Context, clubId string) error {

	// Grab the sum of all partitions counters
	getCurrentCount := clubMembersPartitionsTable.
		SelectBuilder().
		Where(
			qb.Eq("club_id"),
		).
		Sum("members_count").
		Query(r.session).
		BindStruct(clubMemberByClub{
			ClubId: clubId,
		})

	type clubMembersPartitionSum struct {
		SumMembersCount int `db:"sum(members_count)"`
	}

	var clubMembersPartitionSums clubMembersPartitionSum

	if err := getCurrentCount.Get(&clubMembersPartitionSums); err != nil {
		return fmt.Errorf("failed to get club by id: %v", err)
	}

	// update club member count
	return r.updateClubMemberCount(ctx, clubId, clubMembersPartitionSums.SumMembersCount)
}

func (r ClubCassandraRepository) GetAccountClubMemberships(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*club.Member, error) {
	//TODO implement me
	panic("implement me")
}

func (r ClubCassandraRepository) GetMembersForClub(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, clubId string) ([]*club.Member, error) {
	//TODO implement me
	panic("implement me")
}

func (r ClubCassandraRepository) RemoveClubMemberFromlist(ctx context.Context, clubId, accountId string) error {
	//TODO implement me
	panic("implement me")
}
