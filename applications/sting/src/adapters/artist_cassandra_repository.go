package adapters

import (
	"context"
	"fmt"

	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/sting/src/domain/artist"
	"overdoll/libraries/ksuid"
)

type Artist struct {
	Id       ksuid.UUID `db:"user_id"`
	Username string     `db:"user_username"`
	Avatar   string     `db:"user_avatar"`
}

type ArtistCassandraRepository struct {
	session gocqlx.Session
}

func NewArtistCassandraRepository(session gocqlx.Session) ArtistCassandraRepository {
	return ArtistCassandraRepository{session: session}
}

func (r *CharacterCassandraRepository) GetArtists(ctx context.Context) ([]*artist.Artist, error) {

	var dbArtists []Artist

	qc := qb.Select("artists").Columns("user_id", "user_username", "user_avatar").Query(r.session)

	if err := qc.Select(&dbArtists); err != nil {
		return nil, fmt.Errorf("select() failed: %s", err)
	}

	var artists []*artist.Artist

	for _, dbArt := range dbArtists {
		artists = append(artists, artist.UnmarshalArtistFromDatabase(dbArt.Id, dbArt.Username, dbArt.Avatar))
	}

	return artists, nil
}
