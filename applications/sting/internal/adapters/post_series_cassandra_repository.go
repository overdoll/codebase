package adapters

import (
	"context"
	"fmt"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
)

var mediaTable = table.New(table.Metadata{
	Name: "medias",
	Columns: []string{
		"id",
		"title",
		"thumbnail",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type media struct {
	Id        string `db:"id"`
	Title     string `db:"title"`
	Thumbnail string `db:"thumbnail"`
}

func (r PostsCassandraRepository) GetSingleSeriesById(ctx context.Context, mediaId string) (*post.Series, error) {

	queryMedia := r.session.
		Query(mediaTable.Get()).
		Consistency(gocql.One).
		BindStruct(media{Id: mediaId})

	var med *media

	if err := queryMedia.Get(&med); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrSeriesNotFound
		}

		return nil, fmt.Errorf("failed to get media by id: %v", err)
	}

	return post.UnmarshalSeriesFromDatabase(
		med.Id,
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

	queryMedia := qb.Select(mediaTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		Consistency(gocql.One).
		Bind(medi)

	var mediaModels []*media

	if err := queryMedia.Select(&mediaModels); err != nil {
		return nil, fmt.Errorf("failed to get medias by id: %v", err)
	}

	for _, med := range mediaModels {
		medias = append(medias, post.UnmarshalSeriesFromDatabase(
			med.Id,
			med.Title,
			med.Thumbnail,
		))
	}

	return medias, nil
}

func (r PostsCassandraRepository) CreateMedias(ctx context.Context, medias []*post.Series) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	for _, med := range medias {
		stmt, _ := mediaTable.Insert()
		batch.Query(
			stmt,
			med.ID(),
			med.Title(),
			med.Thumbnail(),
		)
	}

	err := r.session.ExecuteBatch(batch)

	if err != nil {
		return fmt.Errorf("failed to create medias: %v", err)
	}

	return nil
}
