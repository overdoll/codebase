package adapters

import (
	"context"
	"fmt"
	"overdoll/libraries/localization"
	"strings"

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
		"total_posts",
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
	TotalPosts          int               `db:"total_posts"`
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

func marshalCategoryToDatabase(pending *post.Category) (*category, error) {
	return &category{
		Id:                  pending.ID(),
		Slug:                pending.Slug(),
		Title:               localization.MarshalTranslationToDatabase(pending.Title()),
		ThumbnailResourceId: pending.ThumbnailResourceId(),
		TotalLikes:          pending.TotalLikes(),
		TotalPosts:          pending.TotalPosts(),
	}, nil
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
		categories = append(categories, post.UnmarshalCategoryFromDatabase(
			cat.Id,
			cat.Slug,
			cat.Title,
			cat.ThumbnailResourceId,
			cat.TotalLikes,
			cat.TotalPosts,
		))
	}

	return categories, nil
}

func (r PostsCassandraRepository) GetCategoryById(ctx context.Context, requester *principal.Principal, categoryId string) (*post.Category, error) {
	return r.getCategoryById(ctx, categoryId)
}

func (r PostsCassandraRepository) CreateCategory(ctx context.Context, requester *principal.Principal, category *post.Category) error {

	pst, err := marshalCategoryToDatabase(category)

	if err != nil {
		return err
	}

	// first, do a unique insert of club to ensure we reserve a unique slug
	applied, err := categorySlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		SerialConsistency(gocql.Serial).
		BindStruct(categorySlugs{Slug: strings.ToLower(pst.Slug), CategoryId: pst.Id}).
		ExecCAS()

	if err != nil {
		return fmt.Errorf("failed to create unique category slug: %v", err)
	}

	if !applied {
		return post.ErrCategorySlugNotUnique
	}

	if err := r.session.
		Query(categoryTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraRepository) updateCategory(ctx context.Context, id string, updateFn func(category *post.Category) error, columns []string) (*post.Category, error) {

	category, err := r.getCategoryById(ctx, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(category)

	if err != nil {
		return nil, err
	}

	pst, err := marshalCategoryToDatabase(category)

	if err != nil {
		return nil, err
	}

	updateCatQuery := r.session.
		Query(categoryTable.Update(
			columns...,
		)).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst)

	if err := updateCatQuery.ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update category: %v", err)
	}

	return category, nil
}

func (r PostsCassandraRepository) UpdateCategoryThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(category *post.Category) error) (*post.Category, error) {
	return r.updateCategory(ctx, id, updateFn, []string{"thumbnail_resource_id"})
}

func (r PostsCassandraRepository) UpdateCategoryTitle(ctx context.Context, requester *principal.Principal, id string, updateFn func(category *post.Category) error) (*post.Category, error) {
	return r.updateCategory(ctx, id, updateFn, []string{"title"})
}

func (r PostsCassandraRepository) UpdateCategoryTotalPostsOperator(ctx context.Context, id string, updateFn func(category *post.Category) error) (*post.Category, error) {
	return r.updateCategory(ctx, id, updateFn, []string{"total_posts"})
}

func (r PostsCassandraRepository) UpdateCategoryTotalLikesOperator(ctx context.Context, id string, updateFn func(category *post.Category) error) (*post.Category, error) {
	return r.updateCategory(ctx, id, updateFn, []string{"total_likes"})
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

	return post.UnmarshalCategoryFromDatabase(
		cat.Id,
		cat.Slug,
		cat.Title,
		cat.ThumbnailResourceId,
		cat.TotalLikes,
		cat.TotalPosts,
	), nil
}
