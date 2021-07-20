package adapters

import (
	"context"
	"fmt"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/src/domain/post"
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

func (r PostsCassandraRepository) GetMediaById(ctx context.Context, mediaId string) (*post.Media, error) {

	queryMedia := r.session.
		Query(mediaTable.Get()).
		Consistency(gocql.One)

	var med *media

	if err := queryMedia.Get(&med); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	return post.UnmarshalMediaFromDatabase(
		med.Id,
		med.Title,
		med.Thumbnail,
	), nil
}

func (r PostsCassandraRepository) GetMediasById(ctx context.Context, medi []string) ([]*post.Media, error) {

	var medias []*post.Media

	// if none then we get out or else the query will fail
	if len(medi) == 0 {
		return medias, nil
	}

	queryMedia := mediaTable.
		SelectBuilder().
		Where(qb.In("id")).
		Query(r.session).
		Consistency(gocql.One).
		BindStruct(medi)

	var mediaModels []*media

	if err := queryMedia.Select(&mediaModels); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	for _, med := range mediaModels {
		medias = append(medias, post.UnmarshalMediaFromDatabase(
			med.Id,
			med.Title,
			med.Thumbnail,
		))
	}

	return medias, nil
}

func (r PostsCassandraRepository) CreateMedias(ctx context.Context, medias []*post.Media) error {

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
		return err
	}

	return nil
}
