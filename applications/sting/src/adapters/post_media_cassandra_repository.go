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

type Media struct {
	Id        string `db:"id"`
	Title     string `db:"title"`
	Thumbnail string `db:"thumbnail"`
}

func (r PostsCassandraRepository) GetMedias(ctx context.Context) ([]*post.Media, error) {
	var dbMed []Media

	qc := r.session.Query(mediaTable.Select()).Consistency(gocql.LocalQuorum)

	if err := qc.Select(&dbMed); err != nil {
		return nil, fmt.Errorf("select() failed: %s", err)
	}

	var medias []*post.Media

	// Now we can safely start creating our documents
	for _, media := range dbMed {

		medias = append(medias, post.UnmarshalMediaFromDatabase(
			media.Id,
			media.Title,
			media.Thumbnail,
		))
	}

	return medias, nil
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

	var mediaModels []*Media

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
			med.RawThumbnail(),
		)
	}

	err := r.session.ExecuteBatch(batch)

	if err != nil {
		return err
	}

	return nil
}
