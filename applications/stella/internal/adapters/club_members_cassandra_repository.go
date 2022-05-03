package adapters

import (
	"context"
	"errors"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/principal"
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
	MemberAccountId string     `db:"member_account_id"`
	JoinedAt        time.Time  `db:"joined_at"`
	IsSupporter     bool       `db:"is_supporter"`
	SupporterSince  *time.Time `db:"supporter_since"`
	Deleted         bool       `db:"deleted"`
}

var clubMembersByAccountTable = table.New(table.Metadata{
	Name: "club_members_by_account",
	Columns: []string{
		"club_id",
		"member_account_id",
	},
	PartKey: []string{"member_account_id"},
	SortKey: []string{"club_id"},
})

type clubMembersByAccount struct {
	ClubId          string `db:"club_id"`
	MemberAccountId string `db:"member_account_id"`
}

func (r ClubCassandraElasticsearchRepository) addInitialClubMemberToBatch(ctx context.Context, batch *gocql.Batch, clubId, accountId string, timestamp time.Time) error {

	stmt, _ := clubMembersTable.Insert()

	batch.Query(stmt, clubId, accountId, timestamp, true, timestamp, false)

	// insert into account's club list
	stmt, _ = clubMembersByAccountTable.Insert()
	batch.Query(stmt, clubId, accountId)

	// insert into account's supported clubs
	stmt, _ = accountSupportedClubsTable.Insert()
	batch.Query(stmt, accountId, clubId)

	return nil
}

func (r ClubCassandraElasticsearchRepository) CreateClubMember(ctx context.Context, member *club.Member) error {

	if err := r.session.
		Query(clubMembersTable.Insert()).
		BindStruct(clubMember{
			ClubId:          member.ClubId(),
			MemberAccountId: member.AccountId(),
			JoinedAt:        member.JoinedAt(),
			IsSupporter:     member.IsSupporter(),
			SupporterSince:  member.SupporterSince(),
			Deleted:         false,
		}).
		ExecRelease(); err != nil {
		return err
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) getClubMemberById(ctx context.Context, clubId, accountId string) (*clubMember, error) {

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

func (r ClubCassandraElasticsearchRepository) deleteClubMemberById(ctx context.Context, clubId, accountId string) error {

	if err := r.session.
		Query(clubMembersTable.Delete()).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubMember{ClubId: clubId, MemberAccountId: accountId}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to get club member by id: %v", err)
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) GetClubMemberByIdOperator(ctx context.Context, clubId, accountId string) (*club.Member, error) {

	clb, err := r.getClubMemberById(ctx, clubId, accountId)

	if err != nil {
		return nil, err
	}

	return club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt, clb.IsSupporter, clb.SupporterSince), nil
}

func (r ClubCassandraElasticsearchRepository) GetClubMemberById(ctx context.Context, requester *principal.Principal, clubId, accountId string) (*club.Member, error) {

	clb, err := r.getClubMemberById(ctx, clubId, accountId)

	if err != nil {
		return nil, err
	}

	// if deleted, return nil
	if clb.Deleted {
		return nil, club.ErrClubMemberNotFound
	}

	return club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt, clb.IsSupporter, clb.SupporterSince), nil
}

func (r ClubCassandraElasticsearchRepository) DeleteClubMember(ctx context.Context, requester *principal.Principal, clubId, accountId string) error {

	mclub, err := r.GetClubById(ctx, clubId)

	if err != nil {
		return err
	}

	clb, err := r.getClubMemberById(ctx, clubId, accountId)

	if err != nil {
		return err
	}

	clubMembership := club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt, clb.IsSupporter, clb.SupporterSince)

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

func (r ClubCassandraElasticsearchRepository) AddClubMemberToList(ctx context.Context, clubId, accountId string) error {

	clb, err := r.getClubMemberById(ctx, clubId, accountId)

	if err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// insert into account's club list
	stmt, _ := clubMembersByAccountTable.Insert()
	batch.Query(stmt, clb.ClubId, clb.MemberAccountId, clb.JoinedAt, clb.IsSupporter, clb.SupporterSince)

	currentClub := club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt, clb.IsSupporter, clb.SupporterSince)

	if err := r.indexClubMember(ctx, currentClub); err != nil {
		return err
	}

	// execute batch
	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to add member to list: %v", err)
	}

	// finally, also update the count
	return nil
}

func (r ClubCassandraElasticsearchRepository) UpdateClubMembersTotalCount(ctx context.Context, clubId string) error {

	_, err := r.client.
		Refresh().
		Index(ClubMembersIndexName).
		Do(ctx)

	if err != nil {
		return fmt.Errorf("failed to refresh club members index: %v", err)
	}

	count, err := r.client.Count().
		Index(ClubMembersIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("club_id", clubId),
			)).
		Do(ctx)

	if err != nil {
		return err
	}

	// update club member count
	return r.updateClubMemberCount(ctx, clubId, int(count))
}

func (r ClubCassandraElasticsearchRepository) GetAccountClubMembershipsCount(ctx context.Context, requester *principal.Principal, accountId string) (int, error) {

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

func (r ClubCassandraElasticsearchRepository) RemoveClubMemberFromlist(ctx context.Context, clubId, accountId string) error {

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

	// execute batch
	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to delete member from lists: %v", err)
	}

	if err := r.deleteClubMemberPostIndexById(ctx, clubId, accountId); err != nil {
		return err
	}

	// delete the final record
	return r.deleteClubMemberById(ctx, clubId, accountId)
}

func (r ClubCassandraElasticsearchRepository) UpdateClubMemberIsSupporter(ctx context.Context, clubId, accountId string, updateFn func(member *club.Member) error) (*club.Member, error) {

	clb, err := r.getClubMemberById(ctx, clubId, accountId)

	if err != nil {
		return nil, err
	}

	currentClub := club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt, clb.IsSupporter, clb.SupporterSince)

	err = updateFn(currentClub)

	if err != nil {
		return nil, err
	}

	clb = &clubMember{
		ClubId:          currentClub.ClubId(),
		MemberAccountId: clb.MemberAccountId,
		JoinedAt:        clb.JoinedAt,
		IsSupporter:     currentClub.IsSupporter(),
		SupporterSince:  currentClub.SupporterSince(),
		Deleted:         false,
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := clubMembersTable.Update("is_supporter", "supporter_since")
	batch.Query(stmt, clb.IsSupporter, clb.SupporterSince, clb.ClubId, clb.MemberAccountId)

	if clb.IsSupporter {
		stmt, _ = accountSupportedClubsTable.Insert()
		batch.Query(stmt, clb.MemberAccountId, clb.ClubId)
	} else {
		stmt, _ = accountSupportedClubsTable.Delete()
		batch.Query(stmt, clb.MemberAccountId, clb.ClubId)
	}

	if err := r.indexClubMember(ctx, currentClub); err != nil {
		return nil, err
	}

	// execute batch
	if err := r.session.ExecuteBatch(batch); err != nil {
		return nil, fmt.Errorf("failed to update club supporter status: %v", err)
	}

	return currentClub, nil
}

func (r ClubCassandraElasticsearchRepository) getAccountClubMemberships(ctx context.Context, accountId string) ([]string, error) {

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

	var clubIds []string
	for _, clb := range accountClubs {
		clubIds = append(clubIds, clb.ClubId)
	}

	return clubIds, nil
}

func (r ClubCassandraElasticsearchRepository) getAccountClubs(ctx context.Context, accountId string) ([]string, error) {

	var accountClub []*accountClubs

	if err := accountClubsTable.
		SelectBuilder().
		CountAll().
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountClubs{
			AccountId: accountId,
		}).
		Get(&accountClub); err != nil {
		return nil, fmt.Errorf("failed to get account clubs by account: %v", err)
	}

	var accountClubIds []string

	for _, c := range accountClub {
		accountClubIds = append(accountClubIds, c.ClubId)
	}

	return accountClubIds, nil
}

func (r ClubCassandraElasticsearchRepository) getAccountSupportedClubs(ctx context.Context, accountId string) ([]string, error) {

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

func (r ClubCassandraElasticsearchRepository) GetAccountClubDigestById(ctx context.Context, accountId string) (*club.AccountClubDigest, error) {

	supportedClubIds, err := r.getAccountSupportedClubs(ctx, accountId)

	if err != nil {
		return nil, err
	}

	accountClubIds, err := r.getAccountClubs(ctx, accountId)

	if err != nil {
		return nil, err
	}

	accountMembershipClubIds, err := r.getAccountClubMemberships(ctx, accountId)

	if err != nil {
		return nil, err
	}

	return club.UnmarshalAccountClubDigestFromDatabase(supportedClubIds, accountMembershipClubIds, accountClubIds), nil
}
