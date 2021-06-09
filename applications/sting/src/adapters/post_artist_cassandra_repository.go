package adapters

import (
	"context"
	"fmt"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/sting/src/domain/post"
)

type Artist struct {
	Id       string `db:"user_id"`
	Username string `db:"user_username"`
	Avatar   string `db:"user_avatar"`
}

func marshalArtistToDatabase(artist *post.Artist) *Artist {

	return &Artist{
		Id:       artist.ID(),
		Username: artist.Username(),
		Avatar:   artist.RawAvatar(),
	}
}

func (r PostsCassandraRepository) GetArtists(ctx context.Context) ([]*post.Artist, error) {

	var dbArtists []Artist

	qc := qb.Select("artists").
		Columns("user_id", "user_username", "user_avatar").
		Query(r.session).
		Consistency(gocql.One)

	if err := qc.Select(&dbArtists); err != nil {
		return nil, fmt.Errorf("select() failed: %s", err)
	}

	var artists []*post.Artist

	for _, dbArt := range dbArtists {
		artists = append(artists, post.UnmarshalArtistFromDatabase(dbArt.Id, dbArt.Username, dbArt.Avatar))
	}

	return artists, nil
}

func (r PostsCassandraRepository) GetArtistById(ctx context.Context, id string) (*post.Artist, error) {

	var artist Artist

	qc := qb.Select("artists").
		Where(qb.Eq("user_id")).
		Columns("user_id", "user_username", "user_avatar").
		Query(r.session).
		BindStruct(&Artist{
			Id: id,
		}).
		Consistency(gocql.One)

	if err := qc.Get(&artist); err != nil {
		return nil, fmt.Errorf("select() failed: %s", err)
	}

	return post.UnmarshalArtistFromDatabase(artist.Id, artist.Username, artist.Avatar), nil
}

func (r PostsCassandraRepository) CreateArtist(ctx context.Context, artist *post.Artist) error {
	pendingArtist := marshalArtistToDatabase(artist)

	insertArtist := qb.Insert("artists").
		Columns(
			"user_id",
			"user_username",
			"user_avatar",
		).
		Query(r.session).
		BindStruct(pendingArtist).
		Consistency(gocql.LocalQuorum)

	if err := insertArtist.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}
