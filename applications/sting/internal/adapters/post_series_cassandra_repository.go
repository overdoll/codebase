package adapters

import (
	"context"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/localization"
	"overdoll/libraries/resource"
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

	marshalled, err := resource.MarshalResourceToDatabase(pending.ThumbnailResource())

	if err != nil {
		return nil, err
	}

	marshalledBanner, err := resource.MarshalResourceToDatabase(pending.BannerResource())

	if err != nil {
		return nil, err
	}

	return &series{
		Id:                pending.ID(),
		Slug:              pending.Slug(),
		Title:             localization.MarshalTranslationToDatabase(pending.Title()),
		ThumbnailResource: marshalled,
		BannerResource:    marshalledBanner,
		TotalLikes:        pending.TotalLikes(),
		TotalPosts:        pending.TotalPosts(),
		CreatedAt:         pending.CreatedAt(),
		UpdatedAt:         pending.UpdatedAt(),
	}, nil
}

func (r PostsCassandraElasticsearchRepository) unmarshalSeriesFromDatabase(ctx context.Context, med *series) (*post.Series, error) {

	unmarshalledResource, err := r.resourceSerializer.UnmarshalResourceFromDatabase(ctx, med.ThumbnailResource)

	if err != nil {
		return nil, err
	}

	unmarshalledBannerResource, err := r.resourceSerializer.UnmarshalResourceFromDatabase(ctx, med.BannerResource)

	if err != nil {
		return nil, err
	}

	return post.UnmarshalSeriesFromDatabase(
		med.Id,
		med.Slug,
		med.Title,
		unmarshalledResource,
		unmarshalledBannerResource,
		med.TotalLikes,
		med.TotalPosts,
		med.CreatedAt,
		med.UpdatedAt,
	), nil
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

	var seriesSlugResults []characterSlug

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

func (r PostsCassandraElasticsearchRepository) GetSeriesByIds(ctx context.Context, medi []string) ([]*post.Series, error) {

	var medias []*post.Series

	// if none then we get out or else the query will fail
	if len(medi) == 0 {
		return medias, nil
	}

	var mediaModels []*series

	if err := qb.Select(seriesTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.One).
		Bind(medi).
		SelectRelease(&mediaModels); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get series by id")
	}

	for _, med := range mediaModels {

		unmarshalled, err := r.unmarshalSeriesFromDatabase(ctx, med)

		if err != nil {
			return nil, err
		}

		medias = append(medias, unmarshalled)
	}

	return medias, nil
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

func (r PostsCassandraElasticsearchRepository) UpdateSeriesThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(series *post.Series) error) (*post.Series, error) {
	return r.updateSeries(ctx, id, updateFn, []string{"thumbnail_resource"})
}

func (r PostsCassandraElasticsearchRepository) UpdateSeriesThumbnailOperator(ctx context.Context, id string, updateFn func(series *post.Series) error) (*post.Series, error) {
	return r.updateSeries(ctx, id, updateFn, []string{"thumbnail_resource"})
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
