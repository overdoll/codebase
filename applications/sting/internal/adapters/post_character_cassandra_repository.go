package adapters

import (
	"context"
	"errors"
	"fmt"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

var characterTable = table.New(table.Metadata{
	Name: "characters",
	Columns: []string{
		"id",
		"slug",
		"name",
		"thumbnail",
		"series_id",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type character struct {
	Id        string `db:"id"`
	Slug      string `db:"slug"`
	Name      string `db:"name"`
	Thumbnail string `db:"thumbnail"`
	SeriesId  string `db:"series_id"`
}

func (r PostsCassandraRepository) GetCharactersById(ctx context.Context, chars []string) ([]*post.Character, error) {

	var characters []*post.Character

	// if none then we get out or else the query will fail
	if len(chars) == 0 {
		return characters, nil
	}

	queryCharacters := qb.Select(characterTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		Bind(chars)

	var characterModels []*character

	if err := queryCharacters.Select(&characterModels); err != nil {
		return nil, fmt.Errorf("failed to get characters by id: %v", err)
	}

	if len(chars) != len(characterModels) {
		return nil, errors.New("invalid character found")
	}

	var mediaIds []string

	for _, cat := range characterModels {
		mediaIds = append(mediaIds, cat.SeriesId)
	}

	queryMedia := qb.Select(seriesTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		Consistency(gocql.One).
		Bind(mediaIds)

	var mediaModels []*series

	if err := queryMedia.Select(&mediaModels); err != nil {
		return nil, fmt.Errorf("failed to get medias by id: %v", err)
	}

	for _, char := range characterModels {

		var serial *series

		for _, med := range mediaModels {
			if med.Id == char.SeriesId {
				serial = med
				break
			}
		}

		if serial == nil {
			return nil, errors.New("no media found for character")
		}

		characters = append(characters, post.UnmarshalCharacterFromDatabase(
			char.Id,
			char.Slug,
			char.Name,
			char.Thumbnail,
			post.UnmarshalSeriesFromDatabase(
				serial.Id,
				serial.Slug,
				serial.Title,
				serial.Thumbnail,
			),
		))
	}

	return characters, nil
}

func (r PostsCassandraRepository) GetCharacterById(ctx context.Context, requester *principal.Principal, characterId string) (*post.Character, error) {

	queryCharacters := r.session.
		Query(characterTable.Get()).
		Consistency(gocql.One).
		BindStruct(character{Id: characterId})

	var char *character

	if err := queryCharacters.Get(&char); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrCharacterNotFound
		}

		return nil, fmt.Errorf("failed to get characters by id: %v", err)
	}

	media, err := r.GetSingleSeriesById(ctx, nil, char.SeriesId)

	if err != nil {
		return nil, err
	}

	return post.UnmarshalCharacterFromDatabase(
		char.Id,
		char.Slug,
		char.Name,
		char.Thumbnail,
		media,
	), nil
}

func (r PostsCassandraRepository) CreateCharacters(ctx context.Context, characters []*post.Character) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	for _, chars := range characters {

		media := chars.Series()

		stmt, _ := characterTable.Insert()
		batch.Query(
			stmt,
			chars.ID(),
			chars.Slug(),
			chars.Name(),
			chars.Thumbnail(),
			media.ID(),
		)
	}

	err := r.session.ExecuteBatch(batch)

	if err != nil {
		return fmt.Errorf("failed to create characters: %v", err)
	}

	return nil
}
