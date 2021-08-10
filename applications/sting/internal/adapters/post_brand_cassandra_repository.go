package adapters

import (
	"context"
	"fmt"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
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
	Id        string `db:"id"`
	Slug      string `db:"slug"`
	Name      string `db:"name"`
	Thumbnail string `db:"thumbnail"`
}

func (r PostsCassandraRepository) GetBrandById(ctx context.Context, brandId string) (*post.Brand, error) {

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
