package adapters

import (
	"context"
	"fmt"
	"strings"

	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/sting/src/domain/character"
	"overdoll/libraries/ksuid"
)

type Character struct {
	Id        ksuid.UUID `db:"id"`
	Name      string     `db:"name"`
	Thumbnail string     `db:"thumbnail"`
	MediaId   ksuid.UUID `db:"media_id"`
}

type Media struct {
	Id        ksuid.UUID `db:"id"`
	Title     string     `db:"title"`
	Thumbnail string     `db:"thumbnail"`
}

type CharacterCassandraRepository struct {
	session gocqlx.Session
}

func NewCharacterCassandraRepository(session gocqlx.Session) CharacterCassandraRepository {
	return CharacterCassandraRepository{session: session}
}

func (r *CharacterCassandraRepository) GetCharacters(ctx context.Context, chars []ksuid.UUID) ([]*character.Character, error) {

	var characters []*character.Character

	final := []string{}

	for _, str := range chars {
		final = append(final, `'`+str.String()+`'`)
	}

	// if none then we get out or else the query will fail
	if len(final) == 0 {
		return characters, nil
	}

	queryCharacters := qb.Select("characters").
		Where(qb.InLit("id", "("+strings.Join(final, ",")+")")).
		Query(r.session)

	var characterModels []*Character

	if err := queryCharacters.Select(&characterModels); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	for _, cat := range characterModels {
		characters = append(characters, character.UnmarshalCharacterFromDatabase(
			cat.Id,
			cat.Name,
			cat.Thumbnail,
			cat.MediaId,
		))
	}

	return characters, nil
}
