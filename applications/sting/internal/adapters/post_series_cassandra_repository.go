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

var seriesTable = table.New(table.Metadata{
	Name: "series",
	Columns: []string{
		"id",
		"slug",
		"title",
		"thumbnail_resource_ids",
		"total_likes",
		"total_posts",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type series struct {
	Id                  string            `db:"id"`
	Slug                string            `db:"slug"`
	Title               map[string]string `db:"title"`
	ThumbnailResourceId string            `db:"thumbnail_resource_id"`
	TotalLikes          int               `db:"total_likes"`
	TotalPosts          int               `db:"total_posts"`
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
	return &series{
		Id:                  pending.ID(),
		Slug:                pending.Slug(),
		Title:               localization.MarshalTranslationToDatabase(pending.Title()),
		ThumbnailResourceId: pending.ThumbnailResourceId(),
		TotalLikes:          pending.TotalLikes(),
		TotalPosts:          pending.TotalPosts(),
	}, nil
}

func (r PostsCassandraRepository) getSeriesBySlug(ctx context.Context, requester *principal.Principal, slug string) (*seriesSlug, error) {

	querySeriesSlug := r.session.
		Query(seriesSlugTable.Get()).
		Consistency(gocql.One).
		BindStruct(seriesSlug{Slug: slug})

	var b seriesSlug

	if err := querySeriesSlug.Get(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrSeriesNotFound
		}

		return nil, fmt.Errorf("failed to get series by slug: %v", err)
	}

	return &b, nil
}

func (r PostsCassandraRepository) GetSeriesIdsFromSlugs(ctx context.Context, seriesIds []string) ([]string, error) {

	var seriesSlugResults []seriesSlug

	if err := qb.Select(seriesSlugTable.Name()).
		Where(qb.In("slug")).
		Query(r.session).
		Consistency(gocql.One).
		Bind(map[string]interface{}{
			"slug": seriesIds,
		}).
		Select(&seriesSlugResults); err != nil {
		return nil, fmt.Errorf("failed to get series slugs: %v", err)
	}

	var ids []string

	for _, i := range seriesSlugResults {
		ids = append(ids, i.SeriesId)
	}

	return ids, nil
}

func (r PostsCassandraRepository) GetSeriesBySlug(ctx context.Context, requester *principal.Principal, slug string) (*post.Series, error) {

	seriesSlug, err := r.getSeriesBySlug(ctx, requester, slug)

	if err != nil {
		return nil, err
	}

	return r.GetSingleSeriesById(ctx, requester, seriesSlug.SeriesId)
}

func (r PostsCassandraRepository) GetSingleSeriesById(ctx context.Context, requester *principal.Principal, seriesId string) (*post.Series, error) {
	return r.getSingleSeriesById(ctx, seriesId)
}

func (r PostsCassandraRepository) getSingleSeriesById(ctx context.Context, seriesId string) (*post.Series, error) {

	queryMedia := r.session.
		Query(seriesTable.Get()).
		Consistency(gocql.One).
		BindStruct(series{Id: seriesId})

	var med series

	if err := queryMedia.Get(&med); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrSeriesNotFound
		}

		return nil, fmt.Errorf("failed to get media by id: %v", err)
	}

	return post.UnmarshalSeriesFromDatabase(
		med.Id,
		med.Slug,
		med.Title,
		med.ThumbnailResourceId,
		med.TotalLikes,
		med.TotalPosts,
	), nil
}

func (r PostsCassandraRepository) GetSeriesByIds(ctx context.Context, requester *principal.Principal, medi []string) ([]*post.Series, error) {

	var medias []*post.Series

	// if none then we get out or else the query will fail
	if len(medi) == 0 {
		return medias, nil
	}

	queryMedia := qb.Select(seriesTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		Consistency(gocql.One).
		Bind(medi)

	var mediaModels []*series

	if err := queryMedia.Select(&mediaModels); err != nil {
		return nil, fmt.Errorf("failed to get medias by id: %v", err)
	}

	for _, med := range mediaModels {
		medias = append(medias, post.UnmarshalSeriesFromDatabase(
			med.Id,
			med.Slug,
			med.Title,
			med.ThumbnailResourceId,
			med.TotalLikes,
			med.TotalPosts,
		))
	}

	return medias, nil
}

func (r PostsCassandraRepository) CreateSeries(ctx context.Context, requester *principal.Principal, series *post.Series) error {

	ser, err := marshalSeriesToDatabase(series)

	if err != nil {
		return err
	}

	// first, do a unique insert of club to ensure we reserve a unique slug
	applied, err := seriesSlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		SerialConsistency(gocql.Serial).
		BindStruct(seriesSlug{Slug: strings.ToLower(ser.Slug), SeriesId: ser.Id}).
		ExecCAS()

	if err != nil {
		return fmt.Errorf("failed to create unique character slug: %v", err)
	}

	if !applied {
		return post.ErrSeriesSlugNotUnique
	}

	if err := r.session.
		Query(seriesTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(series).
		ExecRelease(); err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraRepository) UpdateSeriesThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(series *post.Series) error) (*post.Series, error) {
	return r.updateSeries(ctx, id, updateFn, []string{"thumbnail_resource_id"})
}

func (r PostsCassandraRepository) UpdateSeriesTitle(ctx context.Context, requester *principal.Principal, id string, updateFn func(series *post.Series) error) (*post.Series, error) {
	return r.updateSeries(ctx, id, updateFn, []string{"title"})
}

func (r PostsCassandraRepository) UpdateSeriesTotalPostsOperator(ctx context.Context, id string, updateFn func(series *post.Series) error) (*post.Series, error) {
	return r.updateSeries(ctx, id, updateFn, []string{"total_posts"})
}

func (r PostsCassandraRepository) UpdateSeriesTotalLikesOperator(ctx context.Context, id string, updateFn func(series *post.Series) error) (*post.Series, error) {
	return r.updateSeries(ctx, id, updateFn, []string{"total_likes"})
}

func (r PostsCassandraRepository) updateSeries(ctx context.Context, id string, updateFn func(series *post.Series) error, columns []string) (*post.Series, error) {

	series, err := r.getSingleSeriesById(ctx, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(series)

	if err != nil {
		return nil, err
	}

	pst, err := marshalSeriesToDatabase(series)

	if err != nil {
		return nil, err
	}

	updateSeriesTable := r.session.
		Query(seriesTable.Update(
			columns...,
		)).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst)

	if err := updateSeriesTable.ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update series: %v", err)
	}

	return series, nil
}
