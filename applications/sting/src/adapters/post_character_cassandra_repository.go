package adapters

import (
	"context"
	"errors"
	"fmt"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/src/domain/post"
)

var characterTable = table.New(table.Metadata{
	Name: "characters",
	Columns: []string{
		"id",
		"name",
		"thumbnail",
		"media_id",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type character struct {
	Id        string `db:"id"`
	Name      string `db:"name"`
	Thumbnail string `db:"thumbnail"`
	MediaId   string `db:"media_id"`
}

func (r PostsCassandraRepository) GetCharactersById(ctx context.Context, chars []string) ([]*post.Character, error) {

	var characters []*post.Character

	// if none then we get out or else the query will fail
	if len(chars) == 0 {
		return characters, nil
	}

	queryCharacters := characterTable.
		SelectBuilder().
		Where(qb.In("id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		Bind(chars)

	var characterModels []*character

	if err := queryCharacters.Select(&characterModels); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	if len(chars) != len(characterModels) {
		return nil, errors.New("invalid character found")
	}

	var mediaIds []string

	for _, cat := range characterModels {
		mediaIds = append(mediaIds, cat.MediaId)
	}

	queryMedia := mediaTable.
		SelectBuilder().
		Where(qb.In("id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		Bind(mediaIds)

	var mediaModels []*media

	if err := queryMedia.Select(&mediaModels); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	for _, char := range characterModels {

		var media *media

		for _, med := range mediaModels {
			if med.Id == char.MediaId {
				media = med
				break
			}
		}

		if media == nil {
			return nil, errors.New("no media found for character")
		}

		characters = append(characters, post.UnmarshalCharacterFromDatabase(
			char.Id,
			char.Name,
			char.Thumbnail,
			post.UnmarshalMediaFromDatabase(
				media.Id,
				media.Title,
				media.Thumbnail,
			),
		))
	}

	return characters, nil
}

func (r PostsCassandraRepository) GetCharacterById(ctx context.Context, characterId string) (*post.Character, error) {

	queryCharacters := r.session.
		Query(characterTable.Get()).
		Consistency(gocql.One)

	var char *character

	if err := queryCharacters.Get(&char); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	media, err := r.GetMediaById(ctx, char.MediaId)

	if err != nil {
		return nil, err
	}

	return post.UnmarshalCharacterFromDatabase(
		char.Id,
		char.Name,
		char.Thumbnail,
		media,
	), nil
}

func (r PostsCassandraRepository) GetCharacters(ctx context.Context) ([]*post.Character, error) {
	var dbChars []character

	// Grab all of our characters
	// Doing a direct database query
	qc := r.session.Query(characterTable.Select())

	if err := qc.Select(&dbChars); err != nil {
		return nil, fmt.Errorf("select() failed: %s", err)
	}

	var medias []media

	// Go through each character and grab the media ID, since we need this for the character document
	for _, char := range dbChars {
		medias = append(medias, media{Id: char.MediaId})
	}

	// Get all the medias through a direct database query
	qm := r.session.
		Query(mediaTable.Select()).
		Consistency(gocql.One)

	if err := qm.Select(&medias); err != nil {
		return nil, fmt.Errorf("select() failed: %s", err)
	}

	var characters []*post.Character

	// Now we can safely start creating our documents
	for _, char := range dbChars {

		var media media

		for _, med := range medias {
			if med.Id == char.MediaId {
				media = med
				break
			}
		}

		characters = append(characters, post.UnmarshalCharacterFromDatabase(
			char.Id,
			char.Name,
			char.Thumbnail,
			post.UnmarshalMediaFromDatabase(
				char.MediaId,
				media.Title,
				media.Thumbnail,
			),
		))
	}

	return characters, nil
}

func (r PostsCassandraRepository) CreateCharacters(ctx context.Context, characters []*post.Character) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	for _, chars := range characters {

		media := chars.Media()

		stmt, _ := characterTable.Insert()
		batch.Query(
			stmt,
			chars.ID(),
			chars.Name(),
			chars.RawThumbnail(),
			media.ID(),
		)
	}

	err := r.session.ExecuteBatch(batch)

	if err != nil {
		return err
	}

	return nil
}
