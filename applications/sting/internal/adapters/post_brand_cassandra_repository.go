package adapters

import (
	"context"
	"fmt"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

var brandTable = table.New(table.Metadata{
	Name: "brands",
	Columns: []string{
		"id",
		"slug",
		"name",
		"thumbnail",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type brand struct {
	Id        string            `db:"id"`
	Slug      string            `db:"slug"`
	Name      map[string]string `db:"name"`
	Thumbnail string            `db:"thumbnail"`
}

var brandSlugTable = table.New(table.Metadata{
	Name: "brands_slugs",
	Columns: []string{
		"brand_id",
		"slug",
	},
	PartKey: []string{"slug"},
	SortKey: []string{},
})

type brandSlugs struct {
	BrandId string `db:"brand_id"`
	Slug    string `db:"slug"`
}

func (r PostsCassandraRepository) GetBrandBySlug(ctx context.Context, requester *principal.Principal, slug string) (*post.Brand, error) {

	queryBrandSlug := r.session.
		Query(brandSlugTable.Get()).
		Consistency(gocql.One).
		BindStruct(brandSlugs{Slug: slug})

	var b brandSlugs

	if err := queryBrandSlug.Get(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrBrandNotFound
		}

		return nil, fmt.Errorf("failed to get brand by slug: %v", err)
	}

	return r.GetBrandById(ctx, requester, b.BrandId)
}

func (r PostsCassandraRepository) GetBrandById(ctx context.Context, requester *principal.Principal, brandId string) (*post.Brand, error) {

	queryBrand := r.session.
		Query(brandTable.Get()).
		Consistency(gocql.One).
		BindStruct(brand{Id: brandId})

	var b brand

	if err := queryBrand.Get(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrBrandNotFound
		}

		return nil, fmt.Errorf("failed to get brand by id: %v", err)
	}

	return post.UnmarshalBrandFromDatabase(
		b.Id,
		b.Slug,
		b.Name,
		b.Thumbnail,
	), nil
}
