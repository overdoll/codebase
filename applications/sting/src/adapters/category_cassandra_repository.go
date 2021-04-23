package adapters

import (
	"context"
	"fmt"
	"strings"

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

func (r *CharacterCassandraRepository) GetCategories(ctx context.Context, cats []ksuid.UUID) ([]*category.Category, error) {

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
		categories = append(categories, category.UnmarshalCategoryFromDatabase(cat.Id, cat.Title, cat.Thumbnail))
	}

	return categories, nil
}
