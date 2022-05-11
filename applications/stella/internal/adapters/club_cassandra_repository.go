package adapters

import (
	"context"
	"errors"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"strings"
	"time"
)

var clubTable = table.New(table.Metadata{
	Name: "clubs",
	Columns: []string{
		"id",
		"slug",
		"slug_aliases",
		"name",
		"thumbnail_resource_id",
		"members_count",
		"members_count_last_update_id",
		"owner_account_id",
		"suspended",
		"suspended_until",
		"next_supporter_post_time",
		"has_created_supporter_only_post",
		"terminated",
		"terminated_by_account_id",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type clubs struct {
	Id                          string            `db:"id"`
	Slug                        string            `db:"slug"`
	SlugAliases                 []string          `db:"slug_aliases"`
	Name                        map[string]string `db:"name"`
	ThumbnailResourceId         *string           `db:"thumbnail_resource_id"`
	MembersCount                int               `db:"members_count"`
	MembersCountLastUpdateId    gocql.UUID        `db:"members_count_last_update_id"`
	OwnerAccountId              string            `db:"owner_account_id"`
	Suspended                   bool              `db:"suspended"`
	SuspendedUntil              *time.Time        `db:"suspended_until"`
	NextSupporterPostTime       *time.Time        `db:"next_supporter_post_time"`
	HasCreatedSupporterOnlyPost bool              `db:"has_created_supporter_only_post"`
	Terminated                  bool              `db:"terminated"`
	TerminatedByAccountId       *string           `db:"terminated_by_account_id"`
}

var clubSlugTable = table.New(table.Metadata{
	Name: "clubs_slugs",
	Columns: []string{
		"club_id",
		"slug",
	},
	PartKey: []string{"slug"},
	SortKey: []string{},
})

type clubSlugs struct {
	ClubId string `db:"club_id"`
	Slug   string `db:"slug"`
}

var accountClubsTable = table.New(table.Metadata{
	Name: "account_clubs",
	Columns: []string{
		"account_id",
		"club_id",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"club_id"},
})

type accountClubs struct {
	ClubId    string `db:"club_id"`
	AccountId string `db:"account_id"`
}

var clubSuspensionLogTable = table.New(table.Metadata{
	Name: "club_suspension_log",
	Columns: []string{
		"club_id",
		"id",
		"action_account_id",
		"is_suspension_removal",
		"reason",
		"suspended_until",
	},
	PartKey: []string{"club_id"},
	SortKey: []string{"id"},
})

type clubSuspensionLog struct {
	ClubId              string     `db:"club_id"`
	Id                  string     `db:"id"`
	ActionAccountId     *string    `db:"action_account_id"`
	IsSuspensionRemoval bool       `db:"is_suspension_removal"`
	Reason              *string    `db:"reason"`
	SuspendedUntil      *time.Time `db:"suspended_until"`
}

type ClubCassandraElasticsearchRepository struct {
	session gocqlx.Session
	client  *elastic.Client
}

func NewClubCassandraElasticsearchRepository(session gocqlx.Session, client *elastic.Client) ClubCassandraElasticsearchRepository {
	return ClubCassandraElasticsearchRepository{session: session, client: client}
}

func marshalClubToDatabase(cl *club.Club) (*clubs, error) {
	return &clubs{
		Id:                          cl.ID(),
		Slug:                        cl.Slug(),
		SlugAliases:                 cl.SlugAliases(),
		Name:                        localization.MarshalTranslationToDatabase(cl.Name()),
		ThumbnailResourceId:         cl.ThumbnailResourceId(),
		MembersCount:                cl.MembersCount(),
		MembersCountLastUpdateId:    gocql.TimeUUID(),
		OwnerAccountId:              cl.OwnerAccountId(),
		Suspended:                   cl.Suspended(),
		SuspendedUntil:              cl.SuspendedUntil(),
		NextSupporterPostTime:       cl.NextSupporterPostTime(),
		HasCreatedSupporterOnlyPost: cl.HasCreatedSupporterOnlyPost(),
		Terminated:                  cl.Terminated(),
		TerminatedByAccountId:       cl.TerminatedByAccountId(),
	}, nil
}

func (r ClubCassandraElasticsearchRepository) CreateClubSuspensionLog(ctx context.Context, suspensionLog *club.SuspensionLog) error {

	var reason *string

	if suspensionLog.SuspensionReason() != nil {
		r := suspensionLog.SuspensionReason().String()
		reason = &r
	}

	if err := r.session.
		Query(clubSuspensionLogTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubSuspensionLog{
			ClubId:              suspensionLog.ClubId(),
			Id:                  suspensionLog.Id(),
			ActionAccountId:     suspensionLog.AccountId(),
			IsSuspensionRemoval: suspensionLog.IsSuspensionRemoval(),
			Reason:              reason,
			SuspendedUntil:      suspensionLog.SuspendedUntil(),
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to create club suspension log: %v", err)
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) GetClubSuspensionLogs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, clubId string) ([]*club.SuspensionLog, error) {

	clb, err := r.GetClubById(ctx, clubId)

	if err != nil {
		return nil, err
	}

	if err := club.CanViewClubSuspensionLogs(requester, clb); err != nil {
		return nil, err
	}

	var clubLogs []*clubSuspensionLog

	builder := clubSuspensionLogTable.SelectBuilder()

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "id", true); err != nil {
			return nil, err
		}
	}

	if err := builder.Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&clubSuspensionLog{
			ClubId: clubId,
		}).
		Select(&clubLogs); err != nil {

		return nil, fmt.Errorf("failed to club suspension logs: %v", err)
	}

	var logs []*club.SuspensionLog

	for _, log := range clubLogs {
		lg := club.UnmarshalSuspensionLogFromDatabase(
			log.Id,
			log.ClubId,
			log.ActionAccountId,
			log.Reason,
			log.SuspendedUntil,
			log.IsSuspensionRemoval,
		)
		lg.Node = paging.NewNode(log.Id)
		logs = append(logs, lg)
	}

	return logs, nil
}

func (r ClubCassandraElasticsearchRepository) GetClubBySlug(ctx context.Context, requester *principal.Principal, slug string) (*club.Club, error) {

	var b clubSlugs

	if err := r.session.
		Query(clubSlugTable.Get()).
		Consistency(gocql.One).
		BindStruct(clubSlugs{Slug: strings.ToLower(slug)}).
		Get(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, club.ErrClubNotFound
		}

		return nil, fmt.Errorf("failed to get club by slug: %v", err)
	}

	result, err := r.GetClubById(ctx, b.ClubId)

	if err != nil {
		return nil, err
	}

	if !result.CanView(requester) {
		return nil, club.ErrClubNotFound
	}

	return result, nil
}

func (r ClubCassandraElasticsearchRepository) getClubById(ctx context.Context, brandId string) (*clubs, error) {

	var b clubs

	if err := r.session.
		Query(clubTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubs{Id: brandId}).
		Get(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, club.ErrClubNotFound
		}

		return nil, fmt.Errorf("failed to get club by id: %v", err)
	}

	return &b, nil
}

func (r ClubCassandraElasticsearchRepository) GetClubById(ctx context.Context, brandId string) (*club.Club, error) {

	b, err := r.getClubById(ctx, brandId)

	if err != nil {
		return nil, err
	}

	return club.UnmarshalClubFromDatabase(
		b.Id,
		b.Slug,
		b.SlugAliases,
		b.Name,
		b.ThumbnailResourceId,
		b.MembersCount,
		b.OwnerAccountId,
		b.Suspended,
		b.SuspendedUntil,
		b.NextSupporterPostTime,
		b.HasCreatedSupporterOnlyPost,
		b.Terminated,
		b.TerminatedByAccountId,
	), nil
}

func (r ClubCassandraElasticsearchRepository) GetClubSupporterMembershipsCount(ctx context.Context, requester *principal.Principal, clubId string) (int64, error) {

	clb, err := r.GetClubById(ctx, clubId)

	if err != nil {
		return 0, err
	}

	if err := clb.CanViewSupporterCount(requester); err != nil {
		return 0, err
	}

	return r.getClubsSupporterMembershipCount(ctx, clubId)
}

func (r ClubCassandraElasticsearchRepository) GetClubsByIds(ctx context.Context, clubIds []string) ([]*club.Club, error) {

	var databaseClubs []clubs

	if err := qb.
		Select(clubTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		Bind(clubIds).
		Select(&databaseClubs); err != nil {
		return nil, fmt.Errorf("failed to get clubs by ids: %v", err)
	}

	var clbs []*club.Club

	for _, b := range databaseClubs {
		clbs = append(clbs, club.UnmarshalClubFromDatabase(
			b.Id,
			b.Slug,
			b.SlugAliases,
			b.Name,
			b.ThumbnailResourceId,
			b.MembersCount,
			b.OwnerAccountId,
			b.Suspended,
			b.SuspendedUntil,
			b.NextSupporterPostTime,
			b.HasCreatedSupporterOnlyPost,
			b.Terminated,
			b.TerminatedByAccountId,
		))
	}

	return clbs, nil
}

func (r ClubCassandraElasticsearchRepository) UpdateClubSlug(ctx context.Context, clubId string, updateFn func(cl *club.Club) error) (*club.Club, error) {

	currentClub, err := r.GetClubById(ctx, clubId)

	if err != nil {
		return nil, err
	}

	oldAliasDefault := currentClub.Slug()

	err = updateFn(currentClub)

	if err != nil {
		return nil, err
	}

	aliasDefault := currentClub.Slug()

	// to update the club slug, we basically:
	// remove the slug from the alias list
	// put the old slug into the alias list
	// put the new slug
	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := clubTable.UpdateBuilder().Remove("slug_aliases").ToCql()

	batch.Query(stmt, []string{aliasDefault}, clubId)

	stmt, _ = clubTable.UpdateBuilder().Add("slug_aliases").ToCql()

	batch.Query(stmt, []string{oldAliasDefault}, clubId)

	stmt, _ = clubTable.UpdateBuilder().Set("slug").ToCql()

	batch.Query(stmt, aliasDefault, clubId)

	// execute batch.
	if err := r.session.ExecuteBatch(batch); err != nil {
		return nil, fmt.Errorf("failed to update club slug: %v", err)
	}

	if err := r.indexClub(ctx, currentClub); err != nil {
		return nil, err
	}

	return currentClub, nil
}

func (r ClubCassandraElasticsearchRepository) UpdateClubSlugAliases(ctx context.Context, clubId string, updateFn func(cl *club.Club) error) (*club.Club, error) {

	currentClub, err := r.GetClubById(ctx, clubId)

	if err != nil {
		return nil, err
	}

	oldSlugs := currentClub.SlugAliases()

	err = updateFn(currentClub)

	if err != nil {
		return nil, err
	}

	newSlugs := currentClub.SlugAliases()

	pst, err := marshalClubToDatabase(currentClub)

	newAliasSlugToAdd := ""
	aliasSlugToRemove := ""

	// check for slug removals
	for _, s := range oldSlugs {
		found := false

		for _, v := range newSlugs {
			if v == s {
				found = true
				break
			}
		}

		if !found {
			aliasSlugToRemove = s
			break
		}
	}

	// no new slug additions, look for slug removals
	if aliasSlugToRemove == "" {
		for _, s := range newSlugs {
			found := false

			for _, v := range oldSlugs {
				if v == s {
					found = true
				}
			}

			if !found {
				newAliasSlugToAdd = s
				break
			}
		}
	}

	if aliasSlugToRemove == "" && newAliasSlugToAdd == "" {
		return nil, fmt.Errorf("no removals or additions found")
	}

	// SLUG ADDITION
	if newAliasSlugToAdd != "" {
		if err := r.createUniqueClubSlug(ctx, pst.Id, newAliasSlugToAdd); err != nil {
			return nil, err
		}

		if err := clubTable.
			UpdateBuilder().
			Add("slug_aliases").
			Query(r.session).
			BindMap(map[string]interface{}{
				"id":           pst.Id,
				"slug_aliases": []string{newAliasSlugToAdd},
			}).
			ExecRelease(); err != nil {

			if err := r.deleteUniqueClubSlug(ctx, pst.Id, newAliasSlugToAdd); err != nil {
				return nil, err
			}

			return nil, fmt.Errorf("failed to add club slug alias: %v", err)
		}

		return currentClub, nil
	}

	// SLUG REMOVAL
	if err := r.deleteUniqueClubSlug(ctx, pst.Id, aliasSlugToRemove); err != nil {
		return nil, err
	}

	if err := clubTable.
		UpdateBuilder().
		Remove("slug_aliases").
		Query(r.session).
		BindMap(map[string]interface{}{
			"id":           pst.Id,
			"slug_aliases": []string{aliasSlugToRemove},
		}).
		ExecRelease(); err != nil {

		if err := r.createUniqueClubSlug(ctx, pst.Id, aliasSlugToRemove); err != nil {
			return nil, err
		}

		return nil, fmt.Errorf("failed to remove club slug alias: %v", err)
	}

	if err := r.indexClub(ctx, currentClub); err != nil {
		return nil, err
	}

	return currentClub, nil
}

func (r ClubCassandraElasticsearchRepository) UpdateClubName(ctx context.Context, clubId string, updateFn func(cl *club.Club) error) (*club.Club, error) {
	return r.updateClubRequest(ctx, clubId, updateFn, []string{"name"})
}

func (r ClubCassandraElasticsearchRepository) UpdateClubThumbnail(ctx context.Context, clubId string, updateFn func(cl *club.Club) error) (*club.Club, error) {
	return r.updateClubRequest(ctx, clubId, updateFn, []string{"thumbnail_resource_id"})
}

func (r ClubCassandraElasticsearchRepository) UpdateClubSuspensionStatus(ctx context.Context, clubId string, updateFn func(club *club.Club) error) (*club.Club, error) {
	return r.updateClubRequest(ctx, clubId, updateFn, []string{"suspended", "suspended_until"})
}

func (r ClubCassandraElasticsearchRepository) UpdateClubNextSupporterPostTime(ctx context.Context, clubId string, updateFn func(club *club.Club) error) (*club.Club, error) {
	return r.updateClubRequest(ctx, clubId, updateFn, []string{"next_supporter_post_time", "has_created_supporter_only_post"})
}

func (r ClubCassandraElasticsearchRepository) UpdateClubTerminationStatus(ctx context.Context, clubId string, updateFn func(club *club.Club) error) (*club.Club, error) {
	return r.updateClubRequest(ctx, clubId, updateFn, []string{"terminated", "terminated_by_account_id"})
}

func (r ClubCassandraElasticsearchRepository) updateClubMemberCount(ctx context.Context, clubId string, count int) error {

	clb, err := r.getClubById(ctx, clubId)

	if err != nil {
		return err
	}

	ok, err := clubTable.UpdateBuilder("members_count", "members_count_last_update_id").
		If(qb.EqLit("members_count_last_update_id", clb.MembersCountLastUpdateId.String())).
		Query(r.session).
		BindStruct(clubs{Id: clubId, MembersCount: count, MembersCountLastUpdateId: gocql.TimeUUID()}).
		SerialConsistency(gocql.Serial).
		ExecCAS()

	if err != nil {
		return fmt.Errorf("failed to update club member count: %v", err)
	}

	if !ok {
		return fmt.Errorf("failed to update club member count")
	}

	return r.indexClub(ctx, club.UnmarshalClubFromDatabase(
		clb.Id,
		clb.Slug,
		clb.SlugAliases,
		clb.Name,
		clb.ThumbnailResourceId,
		clb.MembersCount,
		clb.OwnerAccountId,
		clb.Suspended,
		clb.SuspendedUntil,
		clb.NextSupporterPostTime,
		clb.HasCreatedSupporterOnlyPost,
		clb.Terminated,
		clb.TerminatedByAccountId,
	))
}

func (r ClubCassandraElasticsearchRepository) updateClubRequest(ctx context.Context, clubId string, updateFn func(cl *club.Club) error, columns []string) (*club.Club, error) {

	currentClub, err := r.GetClubById(ctx, clubId)

	if err != nil {
		return nil, err
	}

	if err := updateFn(currentClub); err != nil {
		return nil, err
	}

	pst, err := marshalClubToDatabase(currentClub)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(clubTable.Update(columns...)).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {

		return nil, fmt.Errorf("failed to update club: %v", err)
	}

	if err := r.indexClub(ctx, currentClub); err != nil {
		return nil, err
	}

	return currentClub, nil
}

func (r ClubCassandraElasticsearchRepository) getAccountClubsCount(ctx context.Context, accountId string) (int, error) {
	type accountClubsCount struct {
		Count int `db:"count"`
	}

	var clubsCount accountClubsCount

	if err := accountClubsTable.
		SelectBuilder().
		CountAll().
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountClubs{
			AccountId: accountId,
		}).
		Get(&clubsCount); err != nil {
		return 0, fmt.Errorf("failed to get account clubs by account count: %v", err)
	}

	return clubsCount.Count, nil
}

func (r ClubCassandraElasticsearchRepository) GetAccountClubsCount(ctx context.Context, requester *principal.Principal, accountId string) (int, error) {

	if err := club.CanViewAccountClubs(requester, accountId); err != nil {
		return 0, err
	}

	return r.getAccountClubsCount(ctx, accountId)
}

func (r ClubCassandraElasticsearchRepository) deleteClub(ctx context.Context, cla *clubs) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := clubTable.Delete()

	// create actual club table entry
	batch.Query(stmt, cla.Id)

	stmt, _ = accountClubsTable.Delete()

	// create entry for account's clubs
	batch.Query(stmt, cla.OwnerAccountId, cla.Id)

	if err := r.addDeleteInitialClubMemberToBatch(ctx, batch, cla.Id, cla.OwnerAccountId); err != nil {
		return err
	}

	// execute batch.
	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to delete club batch: %v", err)
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) CreateClub(ctx context.Context, club *club.Club) error {

	cla, err := marshalClubToDatabase(club)

	if err != nil {
		return err
	}

	if err := r.createUniqueClubSlug(ctx, cla.Id, cla.Slug); err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := clubTable.Insert()

	// create actual club table entry
	batch.Query(stmt, cla.Id, cla.Slug, cla.SlugAliases, cla.Name, cla.ThumbnailResourceId, cla.MembersCount, cla.MembersCountLastUpdateId, cla.OwnerAccountId, cla.Suspended, cla.SuspendedUntil, cla.NextSupporterPostTime, cla.HasCreatedSupporterOnlyPost, cla.Terminated, cla.TerminatedByAccountId)

	stmt, _ = accountClubsTable.Insert()

	// create entry for account's clubs
	batch.Query(stmt, cla.OwnerAccountId, cla.Id)

	if err := r.addInitialClubMemberToBatch(ctx, batch, cla.Id, cla.OwnerAccountId, time.Now()); err != nil {
		return err
	}

	// execute batch.
	if err := r.session.ExecuteBatch(batch); err != nil {

		// if fails, release unique slug
		if err := r.deleteUniqueClubSlug(ctx, cla.Id, cla.Slug); err != nil {
			return err
		}

		return fmt.Errorf("failed to create club batch: %v", err)
	}

	if err := r.indexClub(ctx, club); err != nil {

		// if fails, release unique slug
		if err := r.deleteUniqueClubSlug(ctx, cla.Id, cla.Slug); err != nil {
			return err
		}

		// also delete the club records
		if err := r.deleteClub(ctx, cla); err != nil {
			return err
		}

		return err
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) deleteUniqueClubSlug(ctx context.Context, clubId, slug string) error {

	// first, do a unique insert of club to ensure we reserve a unique slug
	if err := r.session.
		Query(clubSlugTable.DeleteBuilder().Existing().ToCql()).
		BindStruct(clubSlugs{
			Slug:   strings.ToLower(slug),
			ClubId: clubId,
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to release club slug: %v", err)
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) createUniqueClubSlug(ctx context.Context, clubId, slug string) error {

	// first, do a unique insert of club to ensure we reserve a unique slug
	applied, err := clubSlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		SerialConsistency(gocql.Serial).
		BindStruct(clubSlugs{
			Slug:   strings.ToLower(slug),
			ClubId: clubId,
		}).
		ExecCAS()

	if err != nil {
		return fmt.Errorf("failed to create unique slug: %v", err)
	}

	if !applied {
		return club.ErrClubSlugNotUnique
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) GetAccountClubsCountOperator(ctx context.Context, accountId string) (int, error) {
	return r.getAccountClubsCount(ctx, accountId)
}

func (r ClubCassandraElasticsearchRepository) DeleteAccountData(ctx context.Context, accountId string) error {

	del, err := r.hasNonTerminatedClubs(ctx, accountId)

	if err != nil {
		return err
	}

	if del {
		return errors.New("cannot delete account data")
	}

	return r.deleteAccountClubMemberships(ctx, accountId)
}

func (r ClubCassandraElasticsearchRepository) hasNonTerminatedClubs(ctx context.Context, accountId string) (bool, error) {

	var clubsData []accountClubs

	if err := accountClubsTable.
		SelectBuilder().
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountClubs{
			AccountId: accountId,
		}).
		Select(&clubsData); err != nil {
		return false, fmt.Errorf("failed to get account clubs by account terminated: %v", err)
	}

	hasActiveClubs := false

	for _, c := range clubsData {
		clb, err := r.getClubById(ctx, c.ClubId)

		if err != nil {
			return false, err
		}

		if !clb.Terminated {
			hasActiveClubs = true
			break
		}
	}

	return hasActiveClubs, nil
}

func (r ClubCassandraElasticsearchRepository) HasNonTerminatedClubs(ctx context.Context, requester *principal.Principal, accountId string) (bool, error) {

	if requester != nil {
		if !requester.IsStaff() {
			if err := requester.BelongsToAccount(accountId); err != nil {
				return false, err
			}
		}
	}

	return r.hasNonTerminatedClubs(ctx, accountId)
}
