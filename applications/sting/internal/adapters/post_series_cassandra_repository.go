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

var seriesTable = table.New(table.Metadata{
	Name: "series",
	Columns: []string{
		"id",
		"slug",
		"title",
		"thumbnail_resource_id",
		"total_likes",
		"total_posts",
		"created_at",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type series struct {
	Id                  string            `db:"id"`
	Slug                string            `db:"slug"`
	Title               map[string]string `db:"title"`
	ThumbnailResourceId *string           `db:"thumbnail_resource_id"`
	TotalLikes          int               `db:"total_likes"`
	TotalPosts          int               `db:"total_posts"`
	CreatedAt           time.Time         `db:"created_at"`
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

func marshalSeriesToDatabase(pending *post.Series) *series {
	return &series{
		Id:                  pending.ID(),
		Slug:                pending.Slug(),
		Title:               localization.MarshalTranslationToDatabase(pending.Title()),
		ThumbnailResourceId: pending.ThumbnailResourceId(),
		TotalLikes:          pending.TotalLikes(),
		TotalPosts:          pending.TotalPosts(),
		CreatedAt:           pending.CreatedAt(),
	}
}

func (r PostsCassandraElasticsearchRepository) getSeriesBySlug(ctx context.Context, requester *principal.Principal, slug string) (*seriesSlug, error) {

	var b seriesSlug

	if err := r.session.
		Query(seriesSlugTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(seriesSlug{Slug: strings.ToLower(slug)}).
		GetRelease(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrSeriesNotFound
		}

		return nil, errors.Wrap(err, "failed to get series by slug")
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
		Consistency(gocql.One).
		Bind(lowercaseSlugs).
		SelectRelease(&seriesSlugResults); err != nil {
		return nil, errors.Wrap(err, "failed to get series slugs")
	}

	var ids []string

	for _, i := range seriesSlugResults {
		ids = append(ids, i.SeriesId)
	}

	return ids, nil
}

func (r PostsCassandraElasticsearchRepository) GetSeriesBySlug(ctx context.Context, requester *principal.Principal, slug string) (*post.Series, error) {

	seriesSlug, err := r.getSeriesBySlug(ctx, requester, slug)

	if err != nil {
		return nil, err
	}

	return r.GetSingleSeriesById(ctx, requester, seriesSlug.SeriesId)
}

func (r PostsCassandraElasticsearchRepository) GetSingleSeriesById(ctx context.Context, requester *principal.Principal, seriesId string) (*post.Series, error) {
	return r.getSingleSeriesById(ctx, seriesId)
}

func (r PostsCassandraElasticsearchRepository) getSingleSeriesById(ctx context.Context, seriesId string) (*post.Series, error) {

	var med series

	if err := r.session.
		Query(seriesTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(series{Id: seriesId}).
		GetRelease(&med); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrSeriesNotFound
		}

		return nil, errors.Wrap(err, "failed to get series by id")
	}

	return post.UnmarshalSeriesFromDatabase(
		med.Id,
		med.Slug,
		med.Title,
		med.ThumbnailResourceId,
		med.TotalLikes,
		med.TotalPosts,
		med.CreatedAt,
	), nil
}

func (r PostsCassandraElasticsearchRepository) GetSeriesByIds(ctx context.Context, requester *principal.Principal, medi []string) ([]*post.Series, error) {

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
		Consistency(gocql.One).
		Bind(medi).
		SelectRelease(&mediaModels); err != nil {
		return nil, errors.Wrap(err, "failed to get series by id")
	}

	for _, med := range mediaModels {
		medias = append(medias, post.UnmarshalSeriesFromDatabase(
			med.Id,
			med.Slug,
			med.Title,
			med.ThumbnailResourceId,
			med.TotalLikes,
			med.TotalPosts,
			med.CreatedAt,
		))
	}

	return medias, nil
}

func (r PostsCassandraElasticsearchRepository) deleteUniqueSeriesSlug(ctx context.Context, id, slug string) error {

	if err := r.session.
		Query(seriesSlugTable.DeleteBuilder().Existing().ToCql()).
		WithContext(ctx).
		BindStruct(seriesSlug{Slug: strings.ToLower(slug), SeriesId: id}).
		ExecRelease(); err != nil {
		return errors.Wrap(err, "failed to release series slug")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) CreateSeries(ctx context.Context, requester *principal.Principal, series *post.Series) error {

	ser := marshalSeriesToDatabase(series)

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
		return errors.Wrap(err, "failed to create unique character slug")
	}

	if !applied {
		return post.ErrSeriesSlugNotUnique
	}

	if err := r.session.
		Query(seriesTable.Insert()).
		WithContext(ctx).
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
			Consistency(gocql.LocalQuorum).
			BindStruct(ser).
			ExecRelease(); err != nil {
			return errors.Wrap(err, "failed to delete series")
		}

		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) UpdateSeriesThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(series *post.Series) error) (*post.Series, error) {
	return r.updateSeries(ctx, id, updateFn, []string{"thumbnail_resource_id"})
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

	if err := updateFn(series); err != nil {
		return nil, err
	}

	pst := marshalSeriesToDatabase(series)

	if err := r.session.
		Query(seriesTable.Update(
			columns...,
		)).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(err, "failed to update series")
	}

	if err := r.indexSeries(ctx, series); err != nil {
		return nil, err
	}

	return series, nil
}
