package adapters

import (
	"context"
	"overdoll/libraries/errors"
	"overdoll/libraries/localization"
	"strings"
	"time"

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
		"created_at",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type category struct {
	Id                  string            `db:"id"`
	Slug                string            `db:"slug"`
	Title               map[string]string `db:"title"`
	ThumbnailResourceId *string           `db:"thumbnail_resource_id"`
	TotalLikes          int               `db:"total_likes"`
	TotalPosts          int               `db:"total_posts"`
	CreatedAt           time.Time         `db:"created_at"`
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

func marshalCategoryToDatabase(pending *post.Category) *category {
	return &category{
		Id:                  pending.ID(),
		Slug:                pending.Slug(),
		Title:               localization.MarshalTranslationToDatabase(pending.Title()),
		ThumbnailResourceId: pending.ThumbnailResourceId(),
		TotalLikes:          pending.TotalLikes(),
		TotalPosts:          pending.TotalPosts(),
		CreatedAt:           pending.CreatedAt(),
	}
}

func (r PostsCassandraElasticsearchRepository) GetCategoryIdsFromSlugs(ctx context.Context, categorySlug []string) ([]string, error) {

	var categorySlugResults []categorySlugs

	var lowercaseSlugs []string

	for _, s := range categorySlug {
		lowercaseSlugs = append(lowercaseSlugs, strings.ToLower(s))
	}

	if err := qb.Select(categorySlugTable.Name()).
		Where(qb.In("slug")).
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.One).
		Bind(lowercaseSlugs).
		SelectRelease(&categorySlugResults); err != nil {
		return nil, errors.Wrap(err, "failed to get category slugs")
	}

	var ids []string

	for _, i := range categorySlugResults {
		ids = append(ids, i.CategoryId)
	}

	return ids, nil
}

func (r PostsCassandraElasticsearchRepository) GetCategoryBySlug(ctx context.Context, requester *principal.Principal, slug string) (*post.Category, error) {

	var b categorySlugs

	if err := r.session.
		Query(categorySlugTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(categorySlugs{Slug: strings.ToLower(slug)}).
		GetRelease(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrCategoryNotFound
		}

		return nil, errors.Wrap(err, "failed to get category by slug")
	}

	return r.GetCategoryById(ctx, requester, b.CategoryId)
}

func (r PostsCassandraElasticsearchRepository) GetCategoriesByIds(ctx context.Context, requester *principal.Principal, cats []string) ([]*post.Category, error) {

	var categories []*post.Category

	if len(cats) == 0 {
		return categories, nil
	}

	var categoriesModels []category

	if err := qb.Select(categoryTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		Bind(cats).
		SelectRelease(&categoriesModels); err != nil {
		return nil, errors.Wrap(err, "failed to get categories by id")
	}

	for _, cat := range categoriesModels {
		categories = append(categories, post.UnmarshalCategoryFromDatabase(
			cat.Id,
			cat.Slug,
			cat.Title,
			cat.ThumbnailResourceId,
			cat.TotalLikes,
			cat.TotalPosts,
			cat.CreatedAt,
		))
	}

	return categories, nil
}

func (r PostsCassandraElasticsearchRepository) GetCategoryById(ctx context.Context, requester *principal.Principal, categoryId string) (*post.Category, error) {
	return r.getCategoryById(ctx, categoryId)
}

func (r PostsCassandraElasticsearchRepository) deleteUniqueCategorySlug(ctx context.Context, categoryId, slug string) error {

	if err := r.session.
		Query(categorySlugTable.DeleteBuilder().Existing().ToCql()).
		WithContext(ctx).
		BindStruct(categorySlugs{Slug: strings.ToLower(slug), CategoryId: categoryId}).
		ExecRelease(); err != nil {
		return errors.Wrap(err, "failed to release category slug")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) CreateCategory(ctx context.Context, requester *principal.Principal, category *post.Category) error {

	pst := marshalCategoryToDatabase(category)

	// first, do a unique insert of club to ensure we reserve a unique slug
	applied, err := categorySlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		WithContext(ctx).
		SerialConsistency(gocql.Serial).
		BindStruct(categorySlugs{Slug: strings.ToLower(pst.Slug), CategoryId: pst.Id}).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(err, "failed to create unique category slug")
	}

	if !applied {
		return post.ErrCategorySlugNotUnique
	}

	if err := r.session.
		Query(categoryTable.Insert()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {

		// release the slug
		if err := r.deleteUniqueCategorySlug(ctx, pst.Id, pst.Slug); err != nil {
			return err
		}

		return errors.Wrap(err, "failed to insert category")
	}

	if err := r.indexCategory(ctx, category); err != nil {

		// release the slug
		if err := r.deleteUniqueCategorySlug(ctx, pst.Id, pst.Slug); err != nil {
			return err
		}

		// failed to index category - delete category record
		if err := r.session.
			Query(categoryTable.Delete()).
			WithContext(ctx).
			Consistency(gocql.LocalQuorum).
			BindStruct(pst).
			ExecRelease(); err != nil {
			return errors.Wrap(err, "failed to delete category")
		}

		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) updateCategory(ctx context.Context, id string, updateFn func(category *post.Category) error, columns []string) (*post.Category, error) {

	category, err := r.getCategoryById(ctx, id)

	if err != nil {
		return nil, err
	}

	if err = updateFn(category); err != nil {
		return nil, err
	}

	pst := marshalCategoryToDatabase(category)

	if err := r.session.
		Query(categoryTable.Update(
			columns...,
		)).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(err, "failed to update category")
	}

	if err := r.indexCategory(ctx, category); err != nil {
		return nil, err
	}

	return category, nil
}

func (r PostsCassandraElasticsearchRepository) UpdateCategoryThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(category *post.Category) error) (*post.Category, error) {
	return r.updateCategory(ctx, id, updateFn, []string{"thumbnail_resource_id"})
}

func (r PostsCassandraElasticsearchRepository) UpdateCategoryTitle(ctx context.Context, requester *principal.Principal, id string, updateFn func(category *post.Category) error) (*post.Category, error) {
	return r.updateCategory(ctx, id, updateFn, []string{"title"})
}

func (r PostsCassandraElasticsearchRepository) UpdateCategoryTotalPostsOperator(ctx context.Context, id string, updateFn func(category *post.Category) error) (*post.Category, error) {
	return r.updateCategory(ctx, id, updateFn, []string{"total_posts"})
}

func (r PostsCassandraElasticsearchRepository) UpdateCategoryTotalLikesOperator(ctx context.Context, id string, updateFn func(category *post.Category) error) (*post.Category, error) {
	return r.updateCategory(ctx, id, updateFn, []string{"total_likes"})
}

func (r PostsCassandraElasticsearchRepository) getCategoryById(ctx context.Context, categoryId string) (*post.Category, error) {

	var cat category

	if err := r.session.
		Query(categoryTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(category{Id: categoryId}).
		GetRelease(&cat); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrCategoryNotFound
		}

		return nil, errors.Wrap(err, "failed to get category by id")
	}

	return post.UnmarshalCategoryFromDatabase(
		cat.Id,
		cat.Slug,
		cat.Title,
		cat.ThumbnailResourceId,
		cat.TotalLikes,
		cat.TotalPosts,
		cat.CreatedAt,
	), nil
}
