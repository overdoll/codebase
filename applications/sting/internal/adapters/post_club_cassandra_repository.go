package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/localization"
	"overdoll/libraries/principal"
)

const (
	maxClubMembersPerPartition   = 10000
	initialClubMembersPartitions = 10
)

var clubTable = table.New(table.Metadata{
	Name: "clubs",
	Columns: []string{
		"id",
		"slug",
		"name",
		"thumbnail",
		"members_count",
		"owner_account_id",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type club struct {
	Id             string            `db:"id"`
	Slug           string            `db:"slug"`
	Name           map[string]string `db:"name"`
	Thumbnail      string            `db:"thumbnail"`
	MembersCount   int               `db:"members_count"`
	OwnerAccountId string            `db:"owner_account_id"`
}

var slugsByClub = table.New(table.Metadata{
	Name: "slugs_by_club",
	Columns: []string{
		"club_id",
		"slug",
	},
	PartKey: []string{"club_id"},
	SortKey: []string{"slug"},
})

var clubSlugTable = table.New(table.Metadata{
	Name: "clubs_slugs",
	Columns: []string{
		"club_id",
		"slug",
	},
	PartKey: []string{"slug"},
	SortKey: []string{},
})

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

type clubSlugs struct {
	ClubId string `db:"club_id"`
	Slug   string `db:"slug"`
}

func marshalClubToDatabase(cl *post.Club) (*club, error) {

	thumbnail, err := cl.Thumbnail().MarshalResourceToDatabase()

	if err != nil {
		return nil, err
	}

	return &club{
		Id:             cl.ID(),
		Slug:           cl.Slug(),
		Name:           localization.MarshalTranslationToDatabase(cl.Name()),
		Thumbnail:      thumbnail,
		MembersCount:   cl.MembersCount(),
		OwnerAccountId: cl.OwnerAccountId(),
	}, nil
}

func (r PostsCassandraRepository) GetClubBySlug(ctx context.Context, requester *principal.Principal, slug string) (*post.Club, error) {

	queryBrandSlug := r.session.
		Query(clubSlugTable.Get()).
		Consistency(gocql.One).
		BindStruct(clubSlugs{Slug: slug})

	var b clubSlugs

	if err := queryBrandSlug.Get(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrClubNotFound
		}

		return nil, fmt.Errorf("failed to get club by slug: %v", err)
	}

	return r.GetClubById(ctx, requester, b.ClubId)
}

func (r PostsCassandraRepository) GetClubById(ctx context.Context, requester *principal.Principal, brandId string) (*post.Club, error) {

	queryBrand := r.session.
		Query(clubTable.Get()).
		Consistency(gocql.One).
		BindStruct(club{Id: brandId})

	var b club

	if err := queryBrand.Get(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrClubNotFound
		}

		return nil, fmt.Errorf("failed to get club by id: %v", err)
	}

	return post.UnmarshalClubFromDatabase(
		b.Id,
		b.Slug,
		b.Name,
		b.Thumbnail,
		b.MembersCount,
		b.OwnerAccountId,
	), nil
}

func (r PostsCassandraRepository) CreateClub(ctx context.Context, requester *principal.Principal, club *post.Club) error {

	cla, err := marshalClubToDatabase(club)

	if err != nil {
		return err
	}

	clbSlug := clubSlugs{
		Slug:   cla.Slug,
		ClubId: cla.Id,
	}

	// first, do a unique insert of club to ensure we reserve a unique slug
	clubSlug := clubTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		SerialConsistency(gocql.Serial).
		BindStruct(clbSlug)

	applied, err := clubSlug.ExecCAS()

	if err != nil {
		return fmt.Errorf("failed to create unique slug: %v", err)
	}

	if !applied {
		return post.ErrClubSlugNotUnique
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
	batch.Query(stmt, cla.Id, cla.Slug, cla.Name, cla.Thumbnail, cla.MembersCount, cla.OwnerAccountId)

	// insert into list of club's slugs
	stmt, _ = slugsByClub.Insert()
	batch.Query(stmt, cla.Id, cla.Slug)

	// execute batch. if fails, release unique slug
	if err := r.session.ExecuteBatch(batch); err != nil {
		if err := r.session.
			Query(clubTable.Delete()).
			BindStruct(clbSlug).
			ExecRelease(); err != nil {
			return fmt.Errorf("failed to release club slug: %v", err)
		}
	}

	return nil
}
