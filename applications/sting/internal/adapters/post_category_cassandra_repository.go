package adapters

import (
	"context"
	"fmt"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
)

var categoryTable = table.New(table.Metadata{
	Name: "categories",
	Columns: []string{
		"id",
		"title",
		"slug",
		"thumbnail",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type category struct {
	Id        string `db:"id"`
	Slug      string `db:"slug"`
	Title     string `db:"title"`
	Thumbnail string `db:"thumbnail"`
}

func (r PostsCassandraRepository) GetCategoriesById(ctx context.Context, cats []string) ([]*post.Category, error) {

	var categories []*post.Category

	if len(cats) == 0 {
		return categories, nil
	}

	queryCategories := qb.Select(categoryTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		Bind(cats)

	var categoriesModels []category

	if err := queryCategories.Select(&categoriesModels); err != nil {
		return nil, fmt.Errorf("failed to get categories by id: %v", err)
	}

	for _, cat := range categoriesModels {
		categories = append(categories, post.UnmarshalCategoryFromDatabase(cat.Id, cat.Slug, cat.Title, cat.Thumbnail))
	}

	return categories, nil
}

func (r PostsCassandraRepository) GetCategoryById(ctx context.Context, categoryId string) (*post.Category, error) {

	queryCategories := r.session.
		Query(categoryTable.Get()).
		Consistency(gocql.One).
		BindStruct(category{Id: categoryId})

	var cat category

	if err := queryCategories.Get(&cat); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrCategoryNotFound
		}

		return nil, fmt.Errorf("failed to get category by id: %v", err)
	}

	return post.UnmarshalCategoryFromDatabase(cat.Id, cat.Slug, cat.Title, cat.Thumbnail), nil
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
			cat.Slug(),
			cat.Title(),
			cat.Thumbnail(),
		)
	}

	err := r.session.ExecuteBatch(batch)

	if err != nil {
		return fmt.Errorf("failed to create categories: %v", err)
	}

	return nil
}
