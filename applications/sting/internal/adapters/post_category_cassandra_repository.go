package adapters

import (
	"context"
	"fmt"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

var categoryTable = table.New(table.Metadata{
	Name: "categories",
	Columns: []string{
		"id",
		"title",
		"slug",
		"thumbnail_resource_id",
		"total_likes",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type category struct {
	Id                  string            `db:"id"`
	Slug                string            `db:"slug"`
	Title               map[string]string `db:"title"`
	ThumbnailResourceId string            `db:"thumbnail_resource_id"`
	TotalLikes          int               `db:"total_likes"`
}

var categorySlugTable = table.New(table.Metadata{
	Name: "categories_slugs",
	Columns: []string{
		"category_id",
		"slug",
	},
	PartKey: []string{"slug"},
	SortKey: []string{},
})

type categorySlugs struct {
	CategoryId string `db:"category_id"`
	Slug       string `db:"slug"`
}

func (r PostsCassandraRepository) GetCategoryBySlug(ctx context.Context, requester *principal.Principal, slug string) (*post.Category, error) {

	queryCategorySlug := r.session.
		Query(categorySlugTable.Get()).
		Consistency(gocql.One).
		BindStruct(categorySlugs{Slug: slug})

	var b categorySlugs

	if err := queryCategorySlug.Get(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrCategoryNotFound
		}

		return nil, fmt.Errorf("failed to get category by slug: %v", err)
	}

	return r.GetCategoryById(ctx, requester, b.CategoryId)
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
		categories = append(categories, post.UnmarshalCategoryFromDatabase(cat.Id, cat.Slug, cat.Title, cat.ThumbnailResourceId, cat.TotalLikes))
	}

	return categories, nil
}

func (r PostsCassandraRepository) GetCategoryById(ctx context.Context, requester *principal.Principal, categoryId string) (*post.Category, error) {
	return r.getCategoryById(ctx, categoryId)
}

func (r PostsCassandraRepository) getCategoryById(ctx context.Context, categoryId string) (*post.Category, error) {

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

	return post.UnmarshalCategoryFromDatabase(cat.Id, cat.Slug, cat.Title, cat.ThumbnailResourceId, cat.TotalLikes), nil
}

func (r PostsCassandraRepository) UpdateCategoryTotalLikesOperator(ctx context.Context, id string, updateFn func(cat *post.Category) error) (*post.Category, error) {

	cat, err := r.getCategoryById(ctx, id)

	if err != nil {
		return nil, err
	}

	oldTotalLikes := cat.TotalLikes()

	if err = updateFn(cat); err != nil {
		return nil, err
	}

	newTotalLikes := cat.TotalLikes()

	builder := categoryTable.UpdateBuilder()

	if err := r.incrementOrDecrementCount(ctx, oldTotalLikes, newTotalLikes, builder, "total_likes", cat.ID()); err != nil {
		return nil, fmt.Errorf("failed to update category total likes: %v", err)
	}

	return cat, nil
}
