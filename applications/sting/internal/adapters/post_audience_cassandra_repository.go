package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"go.uber.org/zap"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/localization"
	"overdoll/libraries/media"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
	"strings"
	"time"
)

var audienceTable = table.New(table.Metadata{
	Name: "audience",
	Columns: []string{
		"id",
		"slug",
		"title",
		"thumbnail_resource",
		"banner_resource",
		"banner_media",
		"standard",
		"total_likes",
		"total_posts",
		"created_at",
		"updated_at",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type audience struct {
	Id                string            `db:"id"`
	Slug              string            `db:"slug"`
	Title             map[string]string `db:"title"`
	ThumbnailResource string            `db:"thumbnail_resource"`
	BannerResource    string            `db:"banner_resource"`
	BannerMedia       *string           `db:"banner_media"`
	Standard          int               `db:"standard"`
	TotalLikes        int               `db:"total_likes"`
	TotalPosts        int               `db:"total_posts"`
	CreatedAt         time.Time         `db:"created_at"`
	UpdatedAt         time.Time         `db:"updated_at"`
}

var audienceSlugTable = table.New(table.Metadata{
	Name: "audience_slugs",
	Columns: []string{
		"audience_id",
		"slug",
	},
	PartKey: []string{"slug"},
	SortKey: []string{},
})

type audienceSlug struct {
	AudienceId string `db:"audience_id"`
	Slug       string `db:"slug"`
}

func marshalAudienceToDatabase(pending *post.Audience) (*audience, error) {

	standard := 0

	if pending.IsStandard() {
		standard = 1
	}

	marshalledBanner, err := media.MarshalMediaToDatabase(pending.BannerMedia())

	if err != nil {
		return nil, err
	}

	var bannerResource string

	if pending.BannerMedia() != nil {
		bannerResource = pending.BannerMedia().LegacyResource()
	}

	var thumbnailResource string

	if pending.ThumbnailMedia() != nil {
		thumbnailResource = pending.ThumbnailMedia().LegacyResource()
	}

	return &audience{
		Id:                pending.ID(),
		Slug:              pending.Slug(),
		Standard:          standard,
		Title:             localization.MarshalTranslationToDatabase(pending.Title()),
		ThumbnailResource: thumbnailResource,
		BannerResource:    bannerResource,
		BannerMedia:       marshalledBanner,
		TotalLikes:        pending.TotalLikes(),
		TotalPosts:        pending.TotalPosts(),
		CreatedAt:         pending.CreatedAt(),
		UpdatedAt:         pending.UpdatedAt(),
	}, nil
}

func (r PostsCassandraElasticsearchRepository) unmarshalAudienceFromDatabase(ctx context.Context, b *audience) (*post.Audience, error) {

	unmarshalled, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, b.ThumbnailResource, nil)

	if err != nil {
		return nil, err
	}

	unmarshalledBanner, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, b.BannerResource, b.BannerMedia)

	if err != nil {
		return nil, err
	}

	return post.UnmarshalAudienceFromDatabase(
		b.Id,
		b.Slug,
		b.Title,
		unmarshalled,
		unmarshalledBanner,
		b.Standard,
		b.TotalLikes,
		b.TotalPosts,
		b.CreatedAt,
		b.UpdatedAt,
	), nil
}

func (r PostsCassandraElasticsearchRepository) UpdateAudienceSlug(ctx context.Context, id, slug string, keepOld bool) error {

	aud, err := r.getRawAudienceById(ctx, id)

	if err != nil {
		return err
	}

	// first, do a unique insert of slug to ensure we reserve a unique slug
	applied, err := audienceSlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		WithContext(ctx).
		SerialConsistency(gocql.Serial).
		BindStruct(audienceSlug{Slug: strings.ToLower(slug), AudienceId: id}).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create unique audience slug")
	}

	if !applied {
		zap.S().Infow("slug already exists, will perform local update", zap.String("slug", slug))
	}

	if applied && !keepOld {
		if err := r.deleteUniqueAudienceSlug(ctx, id, aud.Slug); err != nil {
			return err
		}
	}

	aud.Slug = slug

	if err := r.session.
		Query(audienceTable.Update("slug")).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(aud).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to update audience slug")
	}

	unmarshalled, err := r.unmarshalAudienceFromDatabase(ctx, aud)

	if err != nil {
		return err
	}

	if err := r.indexAudience(ctx, unmarshalled); err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) GetAudienceIdsFromSlugs(ctx context.Context, audienceSlugs []string) ([]string, error) {

	var audienceSlugResults []audienceSlug

	var lowercaseSlugs []string

	for _, s := range audienceSlugs {
		lowercaseSlugs = append(lowercaseSlugs, strings.ToLower(s))
	}

	if err := qb.Select(audienceSlugTable.Name()).
		Where(qb.In("slug")).
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.One).
		Bind(lowercaseSlugs).
		SelectRelease(&audienceSlugResults); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get audience slugs")
	}

	var ids []string

	for _, i := range audienceSlugResults {
		ids = append(ids, i.AudienceId)
	}

	return ids, nil
}

func (r PostsCassandraElasticsearchRepository) GetAudienceBySlug(ctx context.Context, slug string) (*post.Audience, error) {

	var b audienceSlug

	if err := r.session.
		Query(audienceSlugTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(audienceSlug{Slug: strings.ToLower(slug)}).
		GetRelease(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("audience", slug)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get audience by slug")
	}

	return r.GetAudienceById(ctx, b.AudienceId)
}

func (r PostsCassandraElasticsearchRepository) getRawAudienceById(ctx context.Context, audienceId string) (*audience, error) {

	var b audience

	if err := r.session.
		Query(audienceTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(audience{Id: audienceId}).
		GetRelease(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("audience", audienceId)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get audience by id")
	}

	return &b, nil
}

func (r PostsCassandraElasticsearchRepository) getAudienceById(ctx context.Context, audienceId string) (*post.Audience, error) {

	aud, err := r.getRawAudienceById(ctx, audienceId)

	if err != nil {
		return nil, err
	}

	unmarshalled, err := r.unmarshalAudienceFromDatabase(ctx, aud)

	if err != nil {
		return nil, err
	}

	return unmarshalled, nil
}

func (r PostsCassandraElasticsearchRepository) GetAudienceById(ctx context.Context, audienceId string) (*post.Audience, error) {
	return r.getAudienceById(ctx, audienceId)
}

func (r PostsCassandraElasticsearchRepository) deleteUniqueAudienceSlug(ctx context.Context, audienceId, slug string) error {

	if err := r.session.
		Query(audienceSlugTable.DeleteBuilder().Existing().ToCql()).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(audienceSlug{Slug: strings.ToLower(slug), AudienceId: audienceId}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to release audience slug")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) CreateAudience(ctx context.Context, requester *principal.Principal, audience *post.Audience) error {

	aud, err := marshalAudienceToDatabase(audience)

	if err != nil {
		return err
	}

	// first, do a unique insert of club to ensure we reserve a unique slug
	applied, err := audienceSlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		WithContext(ctx).
		SerialConsistency(gocql.Serial).
		BindStruct(audienceSlug{Slug: strings.ToLower(aud.Slug), AudienceId: aud.Id}).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create unique audience slug")
	}

	if !applied {
		return post.ErrAudienceSlugNotUnique
	}

	if err := r.session.
		Query(audienceTable.Insert()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(aud).
		ExecRelease(); err != nil {

		if err := r.deleteUniqueAudienceSlug(ctx, aud.Id, aud.Slug); err != nil {
			return err
		}

		return err
	}

	if err := r.indexAudience(ctx, audience); err != nil {

		// release the slug
		if err := r.deleteUniqueAudienceSlug(ctx, aud.Id, aud.Slug); err != nil {
			return err
		}

		// failed to index audience - delete audience record
		if err := r.session.
			Query(audienceTable.Delete()).
			WithContext(ctx).
			Idempotent(true).
			Consistency(gocql.LocalQuorum).
			BindStruct(aud).
			ExecRelease(); err != nil {
			return errors.Wrap(support.NewGocqlError(err), "failed delete audience")
		}

		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) UpdateAudienceBanner(ctx context.Context, requester *principal.Principal, id string, updateFn func(audience *post.Audience) error) (*post.Audience, error) {
	return r.updateAudience(ctx, id, updateFn, []string{"banner_media"})
}

func (r PostsCassandraElasticsearchRepository) UpdateAudienceBannerOperator(ctx context.Context, id string, updateFn func(audience *post.Audience) error) (*post.Audience, error) {
	return r.updateAudience(ctx, id, updateFn, []string{"banner_media"})
}

func (r PostsCassandraElasticsearchRepository) UpdateAudienceTitle(ctx context.Context, requester *principal.Principal, id string, updateFn func(audience *post.Audience) error) (*post.Audience, error) {
	return r.updateAudience(ctx, id, updateFn, []string{"title"})
}

func (r PostsCassandraElasticsearchRepository) UpdateAudienceIsStandard(ctx context.Context, requester *principal.Principal, id string, updateFn func(audience *post.Audience) error) (*post.Audience, error) {
	return r.updateAudience(ctx, id, updateFn, []string{"standard"})
}

func (r PostsCassandraElasticsearchRepository) UpdateAudienceTotalPostsOperator(ctx context.Context, id string, updateFn func(audience *post.Audience) error) (*post.Audience, error) {
	return r.updateAudience(ctx, id, updateFn, []string{"total_posts"})
}

func (r PostsCassandraElasticsearchRepository) UpdateAudienceTotalLikesOperator(ctx context.Context, id string, updateFn func(audience *post.Audience) error) (*post.Audience, error) {
	return r.updateAudience(ctx, id, updateFn, []string{"total_likes"})
}

func (r PostsCassandraElasticsearchRepository) updateAudience(ctx context.Context, id string, updateFn func(audience *post.Audience) error, columns []string) (*post.Audience, error) {

	aud, err := r.getAudienceById(ctx, id)

	if err != nil {
		return nil, err
	}

	if err = updateFn(aud); err != nil {
		return nil, err
	}

	pst, err := marshalAudienceToDatabase(aud)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(audienceTable.Update(
			append(columns, "updated_at")...,
		)).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update audience")
	}

	if err := r.indexAudience(ctx, aud); err != nil {
		return nil, err
	}

	return aud, nil
}
