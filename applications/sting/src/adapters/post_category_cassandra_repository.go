package adapters

import (
	"context"
	"fmt"
	"strings"

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

	final := []string{}

	for _, str := range cats {
		final = append(final, `'`+str+`'`)
	}

	if len(final) == 0 {
		return categories, nil
	}

	queryCategories := categoryTable.
		SelectBuilder().
		Where(qb.InLit("id", "("+strings.Join(final, ",")+")")).
		Query(r.session).
		Consistency(gocql.One)

	var categoriesModels []category

	if err := queryCategories.Select(&categoriesModels); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	for _, cat := range categoriesModels {
		categories = append(categories, post.UnmarshalCategoryFromDatabase(cat.Id, cat.Title, cat.Thumbnail))
	}

	return categories, nil
}

func (r PostsCassandraRepository) GetCategories(ctx context.Context) ([]*post.Category, error) {

	var dbCategory []category

	qc := r.session.Query(categoryTable.Select()).Consistency(gocql.One)

	if err := qc.Select(&dbCategory); err != nil {
		return nil, fmt.Errorf("select() failed: %s", err)
	}

	var categories []*post.Category

	for _, dbCat := range dbCategory {
		categories = append(categories, post.UnmarshalCategoryFromDatabase(dbCat.Id, dbCat.Title, dbCat.Thumbnail))
	}

	return categories, nil
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
