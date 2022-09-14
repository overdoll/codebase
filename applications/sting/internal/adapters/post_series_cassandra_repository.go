package adapters

import (
	"context"
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

var seriesTable = table.New(table.Metadata{
	Name: "series",
	Columns: []string{
		"id",
		"slug",
		"title",
		"thumbnail_resource",
		"banner_resource",
		"banner_media",
		"total_likes",
		"total_posts",
		"created_at",
		"updated_at",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type series struct {
	Id                string            `db:"id"`
	Slug              string            `db:"slug"`
	Title             map[string]string `db:"title"`
	ThumbnailResource string            `db:"thumbnail_resource"`
	BannerResource    string            `db:"banner_resource"`
	BannerMedia       []byte            `db:"banner_media"`
	TotalLikes        int               `db:"total_likes"`
	TotalPosts        int               `db:"total_posts"`
	CreatedAt         time.Time         `db:"created_at"`
	UpdatedAt         time.Time         `db:"updated_at"`
}

var seriesSlugTable = table.New(table.Metadata{
	Name: "series_slugs",
	Columns: []string{
		"series_id",
		"slug",
	},
	PartKey: []string{"slug"},
	SortKey: []string{},
})

type seriesSlug struct {
	SeriesId string `db:"series_id"`
	Slug     string `db:"slug"`
}

func marshalSeriesToDatabase(pending *post.Series) (*series, error) {

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

	return &series{
		Id:                pending.ID(),
		Slug:              pending.Slug(),
		Title:             localization.MarshalTranslationToDatabase(pending.Title()),
		BannerMedia:       marshalledBanner,
		BannerResource:    bannerResource,
		ThumbnailResource: thumbnailResource,
		TotalLikes:        pending.TotalLikes(),
		TotalPosts:        pending.TotalPosts(),
		CreatedAt:         pending.CreatedAt(),
		UpdatedAt:         pending.UpdatedAt(),
	}, nil
}

func (r PostsCassandraElasticsearchRepository) unmarshalSeriesFromDatabase(ctx context.Context, med *series) (*post.Series, error) {

	unmarshalledThumbnail, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, med.ThumbnailResource, nil)

	if err != nil {
		return nil, err
	}

	unmarshalledBanner, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, med.BannerResource, med.BannerMedia)

	if err != nil {
		return nil, err
	}

	return post.UnmarshalSeriesFromDatabase(
		med.Id,
		med.Slug,
		med.Title,
		unmarshalledThumbnail,
		unmarshalledBanner,
		med.TotalLikes,
		med.TotalPosts,
		med.CreatedAt,
		med.UpdatedAt,
	), nil
}

func (r PostsCassandraElasticsearchRepository) getClubBySlug(ctx context.Context, slug string) (*clubSlugs, error) {

	var b clubSlugs

	if err := r.session.
		Query(clubSlugTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.One).
		BindStruct(clubSlugs{Slug: strings.ToLower(slug)}).
		GetRelease(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("club", slug)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get club by slug")
	}

	return &b, nil
}

func (r PostsCassandraElasticsearchRepository) getSeriesBySlug(ctx context.Context, slug string) (*seriesSlug, error) {

	var b seriesSlug

	if err := r.session.
		Query(seriesSlugTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(seriesSlug{Slug: strings.ToLower(slug)}).
		GetRelease(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("series", slug)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get series by slug")
	}

	return &b, nil
}

func (r PostsCassandraElasticsearchRepository) GetSeriesIdsFromSlugs(ctx context.Context, seriesIds []string) ([]string, error) {

	var seriesSlugResults []seriesSlug

	var lowercaseSlugs []string

	for _, s := range seriesIds {
		lowercaseSlugs = append(lowercaseSlugs, strings.ToLower(s))
	}

	if err := qb.Select(seriesSlugTable.Name()).
		Where(qb.In("slug")).
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.One).
		Bind(lowercaseSlugs).
		SelectRelease(&seriesSlugResults); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get series slugs")
	}

	var ids []string

	for _, i := range seriesSlugResults {
		ids = append(ids, i.SeriesId)
	}

	return ids, nil
}

func (r PostsCassandraElasticsearchRepository) GetSeriesBySlug(ctx context.Context, slug string) (*post.Series, error) {

	seriesSlug, err := r.getSeriesBySlug(ctx, slug)

	if err != nil {
		return nil, err
	}

	return r.GetSingleSeriesById(ctx, seriesSlug.SeriesId)
}

func (r PostsCassandraElasticsearchRepository) GetSingleSeriesById(ctx context.Context, seriesId string) (*post.Series, error) {

	serial, err := r.getSingleSeriesById(ctx, seriesId)

	if err != nil {
		return nil, err
	}

	return r.unmarshalSeriesFromDatabase(ctx, serial)
}

func (r PostsCassandraElasticsearchRepository) getSingleSeriesById(ctx context.Context, seriesId string) (*series, error) {

	var med series

	if err := r.session.
		Query(seriesTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(series{Id: seriesId}).
		GetRelease(&med); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("series", seriesId)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get series by id")
	}

	return &med, nil
}

func (r PostsCassandraElasticsearchRepository) deleteUniqueSeriesSlug(ctx context.Context, id, slug string) error {

	if err := r.session.
		Query(seriesSlugTable.DeleteBuilder().Existing().ToCql()).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(seriesSlug{Slug: strings.ToLower(slug), SeriesId: id}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to release series slug")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) CreateSeries(ctx context.Context, series *post.Series) error {

	ser, err := marshalSeriesToDatabase(series)

	if err != nil {
		return err
	}

	// first, do a unique insert of club to ensure we reserve a unique slug
	applied, err := seriesSlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		WithContext(ctx).
		SerialConsistency(gocql.Serial).
		BindStruct(seriesSlug{Slug: strings.ToLower(ser.Slug), SeriesId: ser.Id}).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create unique character slug")
	}

	if !applied {
		return post.ErrSeriesSlugNotUnique
	}

	if err := r.session.
		Query(seriesTable.Insert()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(ser).
		ExecRelease(); err != nil {

		if err := r.deleteUniqueSeriesSlug(ctx, ser.Id, ser.Slug); err != nil {
			return err
		}

		return errors.Wrap(err, "failed to insert series")
	}

	if err := r.indexSeries(ctx, series); err != nil {

		if err := r.deleteUniqueSeriesSlug(ctx, ser.Id, ser.Slug); err != nil {
			return err
		}

		// failed to index series - delete series record
		if err := r.session.
			Query(seriesTable.Delete()).
			WithContext(ctx).
			Idempotent(true).
			Consistency(gocql.LocalQuorum).
			BindStruct(ser).
			ExecRelease(); err != nil {
			return errors.Wrap(support.NewGocqlError(err), "failed to delete series")
		}

		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) UpdateSeriesSlug(ctx context.Context, id, slug string, keepOld bool) error {

	serial, err := r.getSingleSeriesById(ctx, id)

	if err != nil {
		return err
	}

	// first, do a unique insert of slug to ensure we reserve a unique slug
	applied, err := seriesSlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		WithContext(ctx).
		SerialConsistency(gocql.Serial).
		BindStruct(seriesSlug{Slug: strings.ToLower(slug), SeriesId: id}).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create unique series slug")
	}

	if !applied {
		zap.S().Infow("slug already exists, will perform local update", zap.String("slug", slug))
	}

	if applied && !keepOld {
		if err := r.deleteUniqueSeriesSlug(ctx, id, serial.Slug); err != nil {
			return err
		}
	}

	serial.Slug = slug

	if err := r.session.
		Query(seriesTable.Update("slug")).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(serial).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to update series slug")
	}

	unmarshalled, err := r.unmarshalSeriesFromDatabase(ctx, serial)

	if err != nil {
		return err
	}

	if err := r.indexSeries(ctx, unmarshalled); err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) UpdateSeriesBannerOperator(ctx context.Context, id string, updateFn func(series *post.Series) error) (*post.Series, error) {
	return r.updateSeries(ctx, id, updateFn, []string{"banner_media"})
}

func (r PostsCassandraElasticsearchRepository) UpdateSeriesTitle(ctx context.Context, requester *principal.Principal, id string, updateFn func(series *post.Series) error) (*post.Series, error) {
	return r.updateSeries(ctx, id, updateFn, []string{"title"})
}

func (r PostsCassandraElasticsearchRepository) UpdateSeriesTotalPostsOperator(ctx context.Context, id string, updateFn func(series *post.Series) error) (*post.Series, error) {
	return r.updateSeries(ctx, id, updateFn, []string{"total_posts"})
}

func (r PostsCassandraElasticsearchRepository) UpdateSeriesTotalLikesOperator(ctx context.Context, id string, updateFn func(series *post.Series) error) (*post.Series, error) {
	return r.updateSeries(ctx, id, updateFn, []string{"total_likes"})
}

func (r PostsCassandraElasticsearchRepository) updateSeries(ctx context.Context, id string, updateFn func(series *post.Series) error, columns []string) (*post.Series, error) {

	series, err := r.getSingleSeriesById(ctx, id)

	if err != nil {
		return nil, err
	}

	unmarshalled, err := r.unmarshalSeriesFromDatabase(ctx, series)

	if err != nil {
		return nil, err
	}

	if err := updateFn(unmarshalled); err != nil {
		return nil, err
	}

	pst, err := marshalSeriesToDatabase(unmarshalled)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(seriesTable.Update(
			append(columns, "updated_at")...,
		)).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update series")
	}

	if err := r.indexSeries(ctx, unmarshalled); err != nil {
		return nil, err
	}

	return unmarshalled, nil
}
