package adapters

import (
	"context"
	"fmt"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/src/domain/post"
)

var categoryTable = table.New(table.Metadata{
	Name: "categories",
	Columns: []string{
		"id",
		"title",
		"thumbnail",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type category struct {
	Id        string `db:"id"`
	Title     string `db:"title"`
	Thumbnail string `db:"thumbnail"`
}

func (r PostsCassandraRepository) GetCategoriesById(ctx context.Context, cats []string) ([]*post.Category, error) {

	var categories []*post.Category

	if len(cats) == 0 {
		return categories, nil
	}

	queryCategories := categoryTable.
		SelectBuilder().
		Where(qb.In("id")).
		Query(r.session).
		Consistency(gocql.One).
		Bind(cats)

	var categoriesModels []category

	if err := queryCategories.Select(&categoriesModels); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	for _, cat := range categoriesModels {
		categories = append(categories, post.UnmarshalCategoryFromDatabase(cat.Id, cat.Title, cat.Thumbnail))
	}

	return categories, nil
}

func (r PostsCassandraRepository) GetCategoryById(ctx context.Context, categoryId string) (*post.Category, error) {

	queryCategories := r.session.
		Query(categoryTable.Get()).
		Consistency(gocql.One)

	var cat category

	if err := queryCategories.Get(&cat); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	return post.UnmarshalCategoryFromDatabase(cat.Id, cat.Title, cat.Thumbnail), nil
}

func (r PostsCassandraRepository) CreateCategories(ctx context.Context, categories []*post.Category) error {

	// Begin BATCH operation:
	// Will insert categories, characters, media
	batch := r.session.NewBatch(gocql.LoggedBatch)

	// Go through each category request
	for _, cat := range categories {
		// Create new categories query
		stmt, _ := categoryTable.Insert()
		batch.Query(
			stmt,
			cat.ID(),
			cat.Title(),
			cat.RawThumbnail(),
		)
	}

	err := r.session.ExecuteBatch(batch)

	if err != nil {
		return err
	}

	return nil
}
