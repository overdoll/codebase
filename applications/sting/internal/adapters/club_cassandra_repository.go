package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/localization"
	"overdoll/libraries/principal"
)

var clubTable = table.New(table.Metadata{
	Name: "clubs",
	Columns: []string{
		"id",
		"slug",
		"slug_aliases",
		"name",
		"thumbnail",
		"members_count",
		"owner_account_id",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type clubs struct {
	Id             string            `db:"id"`
	Slug           string            `db:"slug"`
	SlugAliases    []string          `db:"slug_aliases"`
	Name           map[string]string `db:"name"`
	Thumbnail      string            `db:"thumbnail"`
	MembersCount   int               `db:"members_count"`
	OwnerAccountId string            `db:"owner_account_id"`
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

type ClubCassandraRepository struct {
	session gocqlx.Session
}

func NewClubCassandraRepository(session gocqlx.Session) ClubCassandraRepository {
	return ClubCassandraRepository{session: session}
}

func marshalClubToDatabase(cl *club.Club) (*clubs, error) {

	thumbnail, err := cl.Thumbnail().MarshalResourceToDatabase()

	if err != nil {
		return nil, err
	}

	return &clubs{
		Id:             cl.ID(),
		Slug:           cl.Slug(),
		SlugAliases:    cl.SlugAliases(),
		Name:           localization.MarshalTranslationToDatabase(cl.Name()),
		Thumbnail:      thumbnail,
		MembersCount:   cl.MembersCount(),
		OwnerAccountId: cl.OwnerAccountId(),
	}, nil
}

func (r ClubCassandraRepository) GetClubBySlug(ctx context.Context, slug string) (*club.Club, error) {

	queryBrandSlug := r.session.
		Query(clubSlugTable.Get()).
		Consistency(gocql.One).
		BindStruct(clubSlugs{Slug: slug})

	var b clubSlugs

	if err := queryBrandSlug.Get(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, club.ErrClubNotFound
		}

		return nil, fmt.Errorf("failed to get club by slug: %v", err)
	}

	return r.GetClubById(ctx, b.ClubId)
}

func (r ClubCassandraRepository) GetClubById(ctx context.Context, brandId string) (*club.Club, error) {

	queryBrand := r.session.
		Query(clubTable.Get()).
		Consistency(gocql.One).
		BindStruct(clubs{Id: brandId})

	var b clubs

	if err := queryBrand.Get(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, club.ErrClubNotFound
		}

		return nil, fmt.Errorf("failed to get club by id: %v", err)
	}

	return club.UnmarshalClubFromDatabase(
		b.Id,
		b.Slug,
		b.SlugAliases,
		b.Name,
		b.Thumbnail,
		b.MembersCount,
		b.OwnerAccountId,
	), nil
}

func (r ClubCassandraRepository) UpdateClubSlug(ctx context.Context, requester *principal.Principal, clubId string, updateFn func(cl *club.Club) error) (*club.Club, error) {
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
	clubUpdate := clubTable.
		UpdateBuilder().
		RemoveLit("slug_aliases", aliasDefault).
		AddLit("slug_aliases", oldAliasDefault).
		Set("slug").
		Query(r.session).
		BindMap(map[string]interface{}{
			"slug": []string{aliasDefault},
		})

	if err := clubUpdate.ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update club slug: %v", err)
	}

	return currentClub, nil
}

func (r ClubCassandraRepository) UpdateClubSlugAliases(ctx context.Context, requester *principal.Principal, clubId string, updateFn func(cl *club.Club) error) (*club.Club, error) {

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

	if aliasSlugToRemove == "" || newAliasSlugToAdd == "" {
		return nil, fmt.Errorf("no removals or additions found")
	}

	// SLUG ADDITION
	if newAliasSlugToAdd != "" {
		if err := r.createUniqueClubSlug(ctx, pst.Id, newAliasSlugToAdd); err != nil {
			return nil, err
		}

		clubUpdate := clubTable.
			UpdateBuilder().
			Add("slug_aliases").
			Query(r.session).
			BindMap(map[string]interface{}{
				"slug_aliases": []string{newAliasSlugToAdd},
			})

		if err := clubUpdate.ExecRelease(); err != nil {

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

	clubUpdate := clubTable.
		UpdateBuilder().
		Remove("slug_aliases").
		Query(r.session).
		BindMap(map[string]interface{}{
			"slug_aliases": []string{aliasSlugToRemove},
		})

	if err := clubUpdate.ExecRelease(); err != nil {

		if err := r.createUniqueClubSlug(ctx, pst.Id, aliasSlugToRemove); err != nil {
			return nil, err
		}

		return nil, fmt.Errorf("failed to remove club slug alias: %v", err)
	}

	return currentClub, nil
}

func (r ClubCassandraRepository) UpdateClubName(ctx context.Context, requester *principal.Principal, clubId string, updateFn func(cl *club.Club) error) (*club.Club, error) {
	return r.updateClubRequest(ctx, requester, clubId, updateFn, []string{"name"})
}

func (r ClubCassandraRepository) updateClubMemberCount(ctx context.Context, clubId string, count int) error {

	clubUpdate := r.session.
		Query(clubTable.Update("members_count")).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubs{Id: clubId, MembersCount: count})

	if err := clubUpdate.ExecRelease(); err != nil {
		return fmt.Errorf("failed to update club member count: %v", err)
	}

	return nil
}

func (r ClubCassandraRepository) updateClubRequest(ctx context.Context, requester *principal.Principal, clubId string, updateFn func(cl *club.Club) error, columns []string) (*club.Club, error) {

	currentClub, err := r.GetClubById(ctx, clubId)

	if err != nil {
		return nil, err
	}

	err = updateFn(currentClub)

	if err != nil {
		return nil, err
	}

	pst, err := marshalClubToDatabase(currentClub)

	if err != nil {
		return nil, err
	}

	clubUpdate := r.session.
		Query(clubTable.Update(columns...)).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst)

	if err := clubUpdate.ExecRelease(); err != nil {

		return nil, fmt.Errorf("failed to update club: %v", err)
	}

	return currentClub, nil
}

func (r ClubCassandraRepository) CreateClub(ctx context.Context, requester *principal.Principal, club *club.Club) error {

	cla, err := marshalClubToDatabase(club)

	if err != nil {
		return err
	}

	if err := r.createUniqueClubSlug(ctx, cla.Id, cla.Slug); err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := clubMembersPartitionsTable.Insert()

	// initially, make 10 partitions with a maximum member count of 10000 per partition
	// will expand when partitions begin to fill up
	for i := 0; i <= initialClubMembersPartitions; i++ {
		batch.Query(stmt, cla.Id, gocql.TimeUUID(), nil, 0, maxClubMembersPerPartition)
	}

	stmt, _ = clubTable.Insert()

	// create actual club table entry
	batch.Query(stmt, cla.Id, cla.Slug, cla.SlugAliases, cla.Name, cla.Thumbnail, cla.MembersCount, cla.OwnerAccountId)

	// execute batch. if fails, release unique slug
	if err := r.session.ExecuteBatch(batch); err != nil {
		return r.deleteUniqueClubSlug(ctx, cla.Id, cla.Slug)
	}

	return nil
}

func (r ClubCassandraRepository) deleteUniqueClubSlug(ctx context.Context, clubId, slug string) error {

	// first, do a unique insert of club to ensure we reserve a unique slug
	if err := r.session.
		Query(clubTable.Delete()).
		BindStruct(clubSlugs{
			Slug:   slug,
			ClubId: clubId,
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to release club slug: %v", err)
	}

	return nil
}

func (r ClubCassandraRepository) createUniqueClubSlug(ctx context.Context, clubId, slug string) error {

	// first, do a unique insert of club to ensure we reserve a unique slug
	clubSlug := clubTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		SerialConsistency(gocql.Serial).
		BindStruct(clubSlugs{
			Slug:   slug,
			ClubId: clubId,
		})

	applied, err := clubSlug.ExecCAS()

	if err != nil {
		return fmt.Errorf("failed to create unique slug: %v", err)
	}

	if !applied {
		return club.ErrClubSlugNotUnique
	}

	return nil
}
