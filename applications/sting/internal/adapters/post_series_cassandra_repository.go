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

var seriesTable = table.New(table.Metadata{
	Name: "series",
	Columns: []string{
		"id",
		"slug",
		"title",
		"thumbnail",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type series struct {
	Id        string            `db:"id"`
	Slug      string            `db:"slug"`
	Title     map[string]string `db:"title"`
	Thumbnail string            `db:"thumbnail"`
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

func (r PostsCassandraRepository) GetSeriesBySlug(ctx context.Context, requester *principal.Principal, slug string) (*post.Series, error) {

	seriesSlug, err := r.getSeriesBySlug(ctx, requester, slug)

	if err != nil {
		return nil, err
	}

	return r.GetSingleSeriesById(ctx, requester, seriesSlug.SeriesId)
}

func (r PostsCassandraRepository) GetSingleSeriesById(ctx context.Context, requester *principal.Principal, seriesId string) (*post.Series, error) {

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
		med.Thumbnail,
	), nil
}

func (r PostsCassandraRepository) GetSeriesById(ctx context.Context, medi []string) ([]*post.Series, error) {

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
			med.Thumbnail,
		))
	}

	return medias, nil
}
