package adapters

import (
	"context"
	"encoding/json"
	"go.uber.org/zap"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/localization"
	"overdoll/libraries/media"
	"overdoll/libraries/support"
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
		"alternative_titles",
		"slug",
		"topic_id",
		"thumbnail_resource",
		"banner_resource",
		"thumbnail_media",
		"banner_media",
		"total_likes",
		"total_posts",
		"created_at",
		"updated_at",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type category struct {
	Id                string            `db:"id"`
	Slug              string            `db:"slug"`
	TopicId           *string           `db:"topic_id"`
	Title             map[string]string `db:"title"`
	AlternativeTitles []string          `db:"alternative_titles"`
	ThumbnailResource string            `db:"thumbnail_resource"`
	BannerResource    string            `db:"banner_resource"`
	ThumbnailMedia    *string           `db:"thumbnail_media"`
	BannerMedia       *string           `db:"banner_media"`
	TotalLikes        int               `db:"total_likes"`
	TotalPosts        int               `db:"total_posts"`
	CreatedAt         time.Time         `db:"created_at"`
	UpdatedAt         time.Time         `db:"updated_at"`
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

	marshalledThumbnail, err := media.MarshalMediaToDatabase(pending.ThumbnailMedia())

	if err != nil {
		return nil, err
	}

	marshalledBanner, err := media.MarshalMediaToDatabase(pending.BannerMedia())

	if err != nil {
		return nil, err
	}

	var alternativeTitles []string

	marshalledTitles := localization.MarshalLocalizedDataTagsToDatabase(pending.AlternativeTitles())

	for _, s := range marshalledTitles {

		res, err := json.Marshal(s)

		if err != nil {
			return nil, err
		}

		alternativeTitles = append(alternativeTitles, string(res))
	}

	var bannerResource string

	if pending.BannerMedia() != nil {
		bannerResource = pending.BannerMedia().LegacyResource()
	}

	var thumbnailResource string

	if pending.ThumbnailMedia() != nil {
		thumbnailResource = pending.ThumbnailMedia().LegacyResource()
	}

	return &category{
		Id:                pending.ID(),
		Slug:              pending.Slug(),
		TopicId:           pending.TopicId(),
		Title:             localization.MarshalTranslationToDatabase(pending.Title()),
		AlternativeTitles: alternativeTitles,
		ThumbnailMedia:    marshalledThumbnail,
		BannerMedia:       marshalledBanner,
		ThumbnailResource: thumbnailResource,
		BannerResource:    bannerResource,
		TotalLikes:        pending.TotalLikes(),
		TotalPosts:        pending.TotalPosts(),
		CreatedAt:         pending.CreatedAt(),
		UpdatedAt:         pending.UpdatedAt(),
	}, nil
}

func (r PostsCassandraElasticsearchRepository) unmarshalCategoryFromDatabase(ctx context.Context, cat *category) (*post.Category, error) {

	unmarshalled, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, cat.ThumbnailResource, cat.ThumbnailMedia)

	if err != nil {
		return nil, err
	}

	unmarshalledBanner, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, cat.BannerResource, cat.BannerMedia)

	if err != nil {
		return nil, err
	}

	alternativeTitles := make([]map[string]string, len(cat.AlternativeTitles))

	for _, s := range cat.AlternativeTitles {

		var tag map[string]string

		if err := json.Unmarshal([]byte(s), &tag); err != nil {
			return nil, err
		}

		alternativeTitles = append(alternativeTitles, tag)
	}

	return post.UnmarshalCategoryFromDatabase(
		cat.Id,
		cat.Slug,
		cat.Title,
		unmarshalled,
		unmarshalledBanner,
		cat.TotalLikes,
		cat.TotalPosts,
		cat.CreatedAt,
		cat.UpdatedAt,
		cat.TopicId,
		alternativeTitles,
	), nil
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
		Idempotent(true).
		Consistency(gocql.One).
		Bind(lowercaseSlugs).
		SelectRelease(&categorySlugResults); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get category slugs")
	}

	var ids []string

	for _, i := range categorySlugResults {
		ids = append(ids, i.CategoryId)
	}

	return ids, nil
}

func (r PostsCassandraElasticsearchRepository) GetCategoryBySlug(ctx context.Context, slug string) (*post.Category, error) {

	var b categorySlugs

	if err := r.session.
		Query(categorySlugTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(categorySlugs{Slug: strings.ToLower(slug)}).
		GetRelease(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("category", slug)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get category by slug")
	}

	return r.GetCategoryById(ctx, b.CategoryId)
}

func (r PostsCassandraElasticsearchRepository) GetCategoryById(ctx context.Context, categoryId string) (*post.Category, error) {
	return r.getCategoryById(ctx, categoryId)
}

func (r PostsCassandraElasticsearchRepository) deleteUniqueCategorySlug(ctx context.Context, categoryId, slug string) error {

	if err := r.session.
		Query(categorySlugTable.DeleteBuilder().Existing().ToCql()).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(categorySlugs{Slug: strings.ToLower(slug), CategoryId: categoryId}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to release category slug")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) CreateCategory(ctx context.Context, requester *principal.Principal, category *post.Category) error {

	pst, err := marshalCategoryToDatabase(category)

	if err != nil {
		return err
	}

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
		return errors.Wrap(support.NewGocqlError(err), "failed to create unique category slug")
	}

	if !applied {
		return post.ErrCategorySlugNotUnique
	}

	if err := r.session.
		Query(categoryTable.Insert()).
		WithContext(ctx).
		Idempotent(true).
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
			Idempotent(true).
			Consistency(gocql.LocalQuorum).
			BindStruct(pst).
			ExecRelease(); err != nil {
			return errors.Wrap(support.NewGocqlError(err), "failed to delete category")
		}

		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) UpdateCategorySlug(ctx context.Context, id, slug string, keepOld bool) error {

	cat, err := r.getRawCategoryById(ctx, id)

	if err != nil {
		return err
	}

	// first, do a unique insert of slug to ensure we reserve a unique slug
	applied, err := categorySlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		WithContext(ctx).
		SerialConsistency(gocql.Serial).
		BindStruct(categorySlugs{Slug: strings.ToLower(slug), CategoryId: id}).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create unique category slug")
	}

	if !applied {
		zap.S().Infow("slug already exists, will perform local update", zap.String("slug", slug))
	}

	if applied && !keepOld {
		if err := r.deleteUniqueCategorySlug(ctx, id, cat.Slug); err != nil {
			return err
		}
	}

	cat.Slug = slug

	if err := r.session.
		Query(categoryTable.Update("slug")).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(cat).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to update category slug")
	}

	unmarshalled, err := r.unmarshalCategoryFromDatabase(ctx, cat)

	if err != nil {
		return err
	}

	if err := r.indexCategory(ctx, unmarshalled); err != nil {
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

	pst, err := marshalCategoryToDatabase(category)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(categoryTable.Update(
			append(columns, "updated_at")...,
		)).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update category")
	}

	if err := r.indexCategory(ctx, category); err != nil {
		return nil, err
	}

	return category, nil
}

func (r PostsCassandraElasticsearchRepository) UpdateCategoryThumbnailOperator(ctx context.Context, id string, updateFn func(category *post.Category) error) (*post.Category, error) {
	return r.updateCategory(ctx, id, updateFn, []string{"thumbnail_resource"})
}

func (r PostsCassandraElasticsearchRepository) UpdateCategoryBannerOperator(ctx context.Context, id string, updateFn func(category *post.Category) error) (*post.Category, error) {
	return r.updateCategory(ctx, id, updateFn, []string{"banner_resource"})
}

func (r PostsCassandraElasticsearchRepository) UpdateCategoryThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(category *post.Category) error) (*post.Category, error) {
	return r.updateCategory(ctx, id, updateFn, []string{"thumbnail_resource"})
}

func (r PostsCassandraElasticsearchRepository) UpdateCategoryTitle(ctx context.Context, requester *principal.Principal, id string, updateFn func(category *post.Category) error) (*post.Category, error) {
	return r.updateCategory(ctx, id, updateFn, []string{"title"})
}

func (r PostsCassandraElasticsearchRepository) UpdateCategoryAlternativeTitles(ctx context.Context, requester *principal.Principal, id string, updateFn func(category *post.Category) error) (*post.Category, error) {
	return r.updateCategory(ctx, id, updateFn, []string{"alternative_titles"})
}

func (r PostsCassandraElasticsearchRepository) UpdateCategoryTopic(ctx context.Context, requester *principal.Principal, id string, updateFn func(category *post.Category) error) (*post.Category, error) {
	return r.updateCategory(ctx, id, updateFn, []string{"topic_id"})
}

func (r PostsCassandraElasticsearchRepository) UpdateCategoryTotalPostsOperator(ctx context.Context, id string, updateFn func(category *post.Category) error) (*post.Category, error) {
	return r.updateCategory(ctx, id, updateFn, []string{"total_posts"})
}

func (r PostsCassandraElasticsearchRepository) UpdateCategoryTotalLikesOperator(ctx context.Context, id string, updateFn func(category *post.Category) error) (*post.Category, error) {
	return r.updateCategory(ctx, id, updateFn, []string{"total_likes"})
}

func (r PostsCassandraElasticsearchRepository) getRawCategoryById(ctx context.Context, categoryId string) (*category, error) {

	var cat category

	if err := r.session.
		Query(categoryTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(category{Id: categoryId}).
		GetRelease(&cat); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("category", categoryId)
		}

		return nil, errors.Wrap(err, "failed to get category by id")
	}

	return &cat, nil
}

func (r PostsCassandraElasticsearchRepository) getCategoryById(ctx context.Context, categoryId string) (*post.Category, error) {

	cat, err := r.getRawCategoryById(ctx, categoryId)

	if err != nil {
		return nil, err
	}

	return r.unmarshalCategoryFromDatabase(ctx, cat)
}
