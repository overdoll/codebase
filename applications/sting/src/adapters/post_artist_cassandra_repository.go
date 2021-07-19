package adapters

import (
	"context"
	"fmt"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/src/domain/post"
)

var artistTable = table.New(table.Metadata{
	Name: "artists",
	Columns: []string{
		"account_id",
		"do_not_post_reason",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{},
})

type Artist struct {
	Id              string `db:"account_id"`
	DoNotPostReason string `db:"do_not_post_reason"`
}

func marshalArtistToDatabase(artist *post.Artist) *Artist {
	return &Artist{
		Id: artist.ID(),
	}
}

func (r PostsCassandraRepository) GetArtists(ctx context.Context) ([]*post.Artist, error) {

	var dbArtists []Artist

	qc := r.session.Query(artistTable.Select()).Consistency(gocql.One)

	if err := qc.Select(&dbArtists); err != nil {
		return nil, fmt.Errorf("select() failed: %s", err)
	}

	var artists []*post.Artist

	for _, dbArt := range dbArtists {
		artists = append(artists, post.UnmarshalArtistFromDatabase(dbArt.Id, dbArt.DoNotPostReason))
	}

	return artists, nil
}

func (r PostsCassandraRepository) GetArtistById(ctx context.Context, id string) (*post.Artist, error) {

	var artist Artist

	qc := r.session.
		Query(artistTable.Select()).
		Consistency(gocql.One).
		BindStruct(&Artist{
			Id: id,
		})

	if err := qc.Get(&artist); err != nil {
		return nil, fmt.Errorf("select() failed: %s", err)
	}

	return post.UnmarshalArtistFromDatabase(artist.Id, artist.DoNotPostReason), nil
}

func (r PostsCassandraRepository) CreateArtist(ctx context.Context, artist *post.Artist) error {
	pendingArtist := marshalArtistToDatabase(artist)

	insertArtist := r.session.
		Query(artistTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(pendingArtist)

	if err := insertArtist.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}
