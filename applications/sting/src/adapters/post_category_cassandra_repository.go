package adapters

import (
	"context"
	"fmt"
	"strings"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/sting/src/domain/post"
)

type Category struct {
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

	queryCategories := qb.Select("categories").
		Where(qb.InLit("id", "("+strings.Join(final, ",")+")")).
		Query(r.session)

	var categoriesModels []Category

	if err := queryCategories.Select(&categoriesModels); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	for _, cat := range categoriesModels {
		categories = append(categories, post.NewCategory(cat.Id, cat.Title, cat.Thumbnail))
	}

	return categories, nil
}

func (r PostsCassandraRepository) GetCategories(ctx context.Context) ([]*post.Category, error) {

	var dbCategory []Category

	qc := qb.Select("categories").Columns("id", "title", "thumbnail").Query(r.session)

	if err := qc.Select(&dbCategory); err != nil {
		return nil, fmt.Errorf("select() failed: %s", err)
	}

	var categories []*post.Category

	for _, dbCat := range dbCategory {
		categories = append(categories, post.NewCategory(dbCat.Id, dbCat.Title, dbCat.Thumbnail))
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
		batch.Query(qb.Insert("categories").LitColumn("id", cat.ID()).LitColumn("title", cat.Title()).ToCql())
	}

	err := r.session.ExecuteBatch(batch)

	if err != nil {
		return err
	}

	return nil
}
