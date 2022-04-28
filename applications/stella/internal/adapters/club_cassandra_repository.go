package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/localization"
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
		"owner_account_id",
		"suspended",
		"suspended_until",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type clubs struct {
	Id                       string            `db:"id"`
	Slug                     string            `db:"slug"`
	SlugAliases              []string          `db:"slug_aliases"`
	Name                     map[string]string `db:"name"`
	ThumbnailResourceId      *string           `db:"thumbnail_resource_id"`
	MembersCount             int               `db:"members_count"`
	MembersCountLastUpdateId gocql.UUID        `db:"members_count_last_update_id"`
	OwnerAccountId           string            `db:"owner_account_id"`
	Suspended                bool              `db:"suspended"`
	SuspendedUntil           *time.Time        `db:"suspended_until"`
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

type ClubCassandraElasticsearchRepository struct {
	session gocqlx.Session
	client  *elastic.Client
}

func NewClubCassandraElasticsearchRepository(session gocqlx.Session, client *elastic.Client) ClubCassandraElasticsearchRepository {
	return ClubCassandraElasticsearchRepository{session: session, client: client}
}

func marshalClubToDatabase(cl *club.Club) (*clubs, error) {
	return &clubs{
		Id:                  cl.ID(),
		Slug:                cl.Slug(),
		SlugAliases:         cl.SlugAliases(),
		Name:                localization.MarshalTranslationToDatabase(cl.Name()),
		ThumbnailResourceId: cl.ThumbnailResourceId(),
		MembersCount:        cl.MembersCount(),
		OwnerAccountId:      cl.OwnerAccountId(),
		Suspended:           cl.Suspended(),
		SuspendedUntil:      cl.SuspendedUntil(),
	}, nil
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
		Consistency(gocql.One).
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
	), nil
}

func (r ClubCassandraElasticsearchRepository) GetClubsByIds(ctx context.Context, clubIds []string) ([]*club.Club, error) {

	var databaseClubs []clubs

	if err := qb.
		Select(clubTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		Consistency(gocql.LocalOne).
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

func (r ClubCassandraElasticsearchRepository) GetAccountClubsCount(ctx context.Context, requester *principal.Principal, accountId string) (int, error) {

	if err := club.CanViewAccountClubs(requester, accountId); err != nil {
		return 0, err
	}

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
		return 0, fmt.Errorf("failed to get account clubs by account: %v", err)
	}

	return clubsCount.Count, nil
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

	firstPartition, err := r.addInitialClubPartitionInsertsToBatch(ctx, batch, cla.Id)

	if err != nil {
		return err
	}

	stmt, _ := clubTable.Insert()

	// create actual club table entry
	batch.Query(stmt, cla.Id, cla.Slug, cla.SlugAliases, cla.Name, cla.ThumbnailResourceId, cla.MembersCount, cla.OwnerAccountId, cla.Suspended, cla.SuspendedUntil)

	stmt, _ = accountClubsTable.Insert()

	// create entry for account's clubs
	batch.Query(stmt, cla.OwnerAccountId, cla.Id)

	if err := r.addInitialClubMemberToBatch(ctx, batch, cla.Id, cla.OwnerAccountId, firstPartition); err != nil {
		return err
	}

	// execute batch.
	if err := r.session.ExecuteBatch(batch); err != nil {

		// if fails, release unique slug
		if err := r.deleteUniqueClubSlug(ctx, cla.Id, cla.Slug); err != nil {
			return err
		}

		return err
	}

	if err := r.indexClub(ctx, club); err != nil {
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
