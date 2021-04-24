package adapters

import (
	"context"
	"fmt"
	"strings"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/sting/src/domain/category"
	"overdoll/libraries/ksuid"
)

type Category struct {
	Id        ksuid.UUID `db:"id"`
	Title     string     `db:"title"`
	Thumbnail string     `db:"thumbnail"`
}

type CategoryCassandraRepository struct {
	session gocqlx.Session
}

func NewCategoryCassandraRepository(session gocqlx.Session) CategoryCassandraRepository {
	return CategoryCassandraRepository{session: session}
}

func (r *CategoryCassandraRepository) GetCategoriesById(ctx context.Context, cats []ksuid.UUID) ([]*category.Category, error) {

	var categories []*category.Category

	final := []string{}

	for _, str := range cats {
		final = append(final, `'`+str.String()+`'`)
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
		categories = append(categories, category.NewCategory(cat.Id, cat.Title, cat.Thumbnail))
	}

	return categories, nil
}

func (r *CategoryCassandraRepository) GetCategories(ctx context.Context) ([]*category.Category, error) {

	var dbCategory []Category

	qc := qb.Select("categories").Columns("id", "title", "thumbnail").Query(r.session)

	if err := qc.Select(&dbCategory); err != nil {
		return nil, fmt.Errorf("select() failed: %s", err)
	}

	var categories []*category.Category

	for _, dbCat := range dbCategory {
		categories = append(categories, category.NewCategory(dbCat.Id, dbCat.Title, dbCat.Thumbnail))
	}

	return categories, nil
}

func (r *CategoryCassandraRepository) CreateCategories(ctx context.Context, categories []*category.Category) error {

	// Begin BATCH operation:
	// Will insert categories, characters, media
	batch := r.session.NewBatch(gocql.LoggedBatch)

	// Go through each category request
	for _, cat := range categories {

		// Create new categories query
		batch.Query(qb.Insert("categories").LitColumn("id", cat.ID().String()).LitColumn("title", cat.Title()).ToCql())

	}

	err := r.session.ExecuteBatch(batch)

	if err != nil {
		return err
	}

	return nil
}
