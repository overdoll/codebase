package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/errors"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
	"time"
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

func (r ClubCassandraElasticsearchRepository) addDeleteInitialClubMemberToBatch(ctx context.Context, batch *gocql.Batch, clubId, accountId string) error {
	stmt, names := clubMembersTable.Delete()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		clubMember{
			ClubId:          clubId,
			MemberAccountId: accountId,
		},
	)

	// insert into account's club list
	stmt, names = clubMembersByAccountTable.Delete()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		clubMembersByAccount{
			ClubId:          clubId,
			MemberAccountId: accountId,
		},
	)

	// insert into account's supported clubs
	stmt, names = accountSupportedClubsTable.Delete()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		accountSupportedClubs{
			ClubId:    clubId,
			AccountId: accountId,
		},
	)

	return nil
}

func (r ClubCassandraElasticsearchRepository) addInitialClubMemberToBatch(ctx context.Context, batch *gocql.Batch, clubId, accountId string, timestamp time.Time) error {

	clubMemb := clubMember{
		ClubId:          clubId,
		MemberAccountId: accountId,
		JoinedAt:        timestamp,
		IsSupporter:     true,
		SupporterSince:  &timestamp,
	}

	stmt, names := clubMembersTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		clubMemb,
	)

	// insert into account's club list
	stmt, names = clubMembersByAccountTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		clubMembersByAccount{
			ClubId:          clubId,
			MemberAccountId: accountId,
		},
	)

	// insert into account's supported clubs
	stmt, names = accountSupportedClubsTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		accountSupportedClubs{
			ClubId:    clubId,
			AccountId: accountId,
		},
	)

	if err := r.indexClubMember(ctx, club.UnmarshalMemberFromDatabase(
		clubMemb.MemberAccountId,
		clubMemb.ClubId,
		clubMemb.JoinedAt,
		clubMemb.IsSupporter,
		clubMemb.SupporterSince,
	)); err != nil {
		return err
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) CreateClubMember(ctx context.Context, member *club.Member) error {

	marshalled := clubMember{
		ClubId:          member.ClubId(),
		MemberAccountId: member.AccountId(),
		JoinedAt:        member.JoinedAt(),
		IsSupporter:     member.IsSupporter(),
		SupporterSince:  member.SupporterSince(),
	}

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	stmt, names := clubMembersTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		marshalled,
	)

	// insert into account's club list
	stmt, names = clubMembersByAccountTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		clubMembersByAccount{
			ClubId:          marshalled.ClubId,
			MemberAccountId: marshalled.MemberAccountId,
		},
	)

	// execute batch
	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(err, "failed to add member to lis")
	}

	if err := r.indexClubMember(ctx, member); err != nil {
		return err
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) getClubMemberById(ctx context.Context, clubId, accountId string) (*clubMember, error) {

	var clubMem clubMember

	if err := r.session.
		Query(clubMembersTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubMember{ClubId: clubId, MemberAccountId: accountId}).
		GetRelease(&clubMem); err != nil {

		if err == gocql.ErrNotFound {
			return nil, club.ErrClubMemberNotFound
		}

		return nil, errors.Wrap(err, "failed to get club member by id")
	}

	return &clubMem, nil
}

func (r ClubCassandraElasticsearchRepository) deleteAccountClubMemberships(ctx context.Context, accountId string) error {

	var clubMembers []clubMembersByAccount

	if err := clubMembersByAccountTable.
		SelectBuilder().
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubMembersByAccount{
			MemberAccountId: accountId,
		}).
		SelectRelease(&clubMembers); err != nil {
		return errors.Wrap(err, "failed to get account club members")
	}

	if len(clubMembers) == 0 {
		return nil
	}

	for _, member := range clubMembers {

		clubId := member.ClubId

		// delete from index
		if err := r.deleteClubMemberIndexById(ctx, clubId, accountId); err != nil {
			return err
		}

		// delete final tables
		batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

		// delete from club members table
		stmt, names := clubMembersTable.Delete()
		support.BindStructToBatchStatement(
			batch,
			stmt, names,
			member,
		)

		// delete from club members by account
		stmt, names = clubMembersByAccountTable.Delete()
		support.BindStructToBatchStatement(
			batch,
			stmt, names,
			clubMembersByAccount{
				ClubId:          clubId,
				MemberAccountId: accountId,
			},
		)

		// delete from supported clubs
		stmt, names = accountSupportedClubsTable.Delete()
		support.BindStructToBatchStatement(
			batch,
			stmt, names,
			accountSupportedClubs{
				ClubId:    clubId,
				AccountId: accountId,
			},
		)

		if err := r.session.ExecuteBatch(batch); err != nil {
			return errors.Wrap(err, "failed to delete account club memberships")
		}
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

	return club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt, clb.IsSupporter, clb.SupporterSince), nil
}

func (r ClubCassandraElasticsearchRepository) DeleteClubMember(ctx context.Context, member *club.Member) error {

	marshalled := clubMember{
		ClubId:          member.ClubId(),
		MemberAccountId: member.AccountId(),
		JoinedAt:        member.JoinedAt(),
		IsSupporter:     member.IsSupporter(),
		SupporterSince:  member.SupporterSince(),
	}

	// delete the index record
	if err := r.deleteClubMemberIndexById(ctx, marshalled.ClubId, marshalled.MemberAccountId); err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	// delete from account's club list
	stmt, names := clubMembersByAccountTable.Delete()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		clubMembersByAccount{
			ClubId:          marshalled.ClubId,
			MemberAccountId: marshalled.MemberAccountId,
		},
	)

	stmt, names = clubMembersTable.Delete()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		marshalled,
	)

	stmt, names = accountSupportedClubsTable.Delete()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		accountSupportedClubs{
			ClubId:    marshalled.ClubId,
			AccountId: marshalled.MemberAccountId,
		},
	)

	// execute batch
	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(err, "failed to delete member from lists")
	}

	return nil
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
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubMembersByAccount{
			MemberAccountId: accountId,
		}).
		GetRelease(&clubMembersCount); err != nil {
		return 0, errors.Wrap(err, "failed to get account clubs by account count")
	}

	return clubMembersCount.Count, nil
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
	}

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	stmt, names := clubMembersTable.Update("is_supporter", "supporter_since")
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		clb,
	)

	if clb.IsSupporter {
		stmt, names = accountSupportedClubsTable.Insert()
		support.BindStructToBatchStatement(
			batch,
			stmt, names,
			accountSupportedClubs{
				ClubId:    clb.ClubId,
				AccountId: clb.MemberAccountId,
			},
		)

	} else {
		stmt, names = accountSupportedClubsTable.Delete()
		support.BindStructToBatchStatement(
			batch,
			stmt, names,
			accountSupportedClubs{
				ClubId:    clb.ClubId,
				AccountId: clb.MemberAccountId,
			},
		)
	}

	if err := r.indexClubMember(ctx, currentClub); err != nil {
		return nil, err
	}

	// execute batch
	if err := r.session.ExecuteBatch(batch); err != nil {
		return nil, errors.Wrap(err, "failed to update club supporter status")
	}

	return currentClub, nil
}

func (r ClubCassandraElasticsearchRepository) getAccountClubMemberships(ctx context.Context, accountId string) ([]string, error) {

	var accountClub []clubMembersByAccount

	if err := clubMembersByAccountTable.
		SelectBuilder().
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubMembersByAccount{
			MemberAccountId: accountId,
		}).
		SelectRelease(&accountClub); err != nil {
		return nil, errors.Wrap(err, "failed to get club members by account")
	}

	var clubIds []string
	for _, clb := range accountClub {
		clubIds = append(clubIds, clb.ClubId)
	}

	return clubIds, nil
}

func (r ClubCassandraElasticsearchRepository) getAccountClubs(ctx context.Context, accountId string) ([]string, error) {

	var accountClub []accountClubs

	if err := accountClubsTable.
		SelectBuilder().
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountClubs{
			AccountId: accountId,
		}).
		SelectRelease(&accountClub); err != nil {
		return nil, errors.Wrap(err, "failed to get account clubs by account")
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
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountSupportedClubs{
			AccountId: accountId,
		}).
		SelectRelease(&supportedClubs); err != nil {
		return nil, errors.Wrap(err, "failed to get account supported clubs")
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
