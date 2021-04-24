package adapters

import (
	"context"
	"fmt"
	"strings"

	"github.com/gocql/gocql"
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

func (r *CharacterCassandraRepository) GetCharactersById(ctx context.Context, chars []ksuid.UUID) ([]*character.Character, error) {

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
		characters = append(characters, character.NewCharacter(
			cat.Id,
			cat.Name,
			cat.Thumbnail,
			cat.MediaId,
			"",
			"",
		))
	}

	return characters, nil
}

func (r *CharacterCassandraRepository) GetCharacters(ctx context.Context) ([]*character.Character, error) {
	var dbChars []Character

	// Grab all of our characters
	// Doing a direct database query
	qc := qb.Select("characters").Columns("id", "media_id", "name", "thumbnail").Query(r.session)

	if err := qc.Select(&dbChars); err != nil {
		return nil, fmt.Errorf("select() failed: %s", err)
	}

	var medias []Media

	// Go through each character and grab the media ID, since we need this for the character document
	for _, char := range dbChars {
		medias = append(medias, Media{Id: char.MediaId})
	}

	// Get all the medias through a direct database query
	qm := qb.Select("media").Columns("id", "thumbnail", "title").Query(r.session)

	if err := qm.Select(&medias); err != nil {
		return nil, fmt.Errorf("select() failed: %s", err)
	}

	var characters []*character.Character

	// Now we can safely start creating our documents
	for _, char := range dbChars {

		var media Media

		for _, med := range medias {
			if med.Id == char.MediaId {
				media = med
			}
		}

		characters = append(characters, character.NewCharacter(
			char.Id,
			char.Name,
			char.Thumbnail,
			char.MediaId,
			media.Title,
			media.Thumbnail,
		))
	}

	return characters, nil
}

func (r *CharacterCassandraRepository) GetMedias(ctx context.Context) ([]*character.Media, error) {
	var dbMed []Media

	qc := qb.Select("media").Columns("id", "title", "thumbnail").Query(r.session)

	if err := qc.Select(&dbMed); err != nil {
		return nil, fmt.Errorf("select() failed: %s", err)
	}

	var medias []*character.Media

	// Now we can safely start creating our documents
	for _, media := range dbMed {

		medias = append(medias, character.NewMedia(
			media.Id,
			media.Title,
			media.Thumbnail,
		))
	}

	return medias, nil
}

func (r *CategoryCassandraRepository) CreateCharacters(ctx context.Context, characters []*character.Character) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	for _, chars := range characters {

		media := chars.Media()

		batch.Query(
			qb.Insert("characters").
				LitColumn("id", chars.ID().String()).
				LitColumn("name", chars.Name()).
				LitColumn("media_id", media.ID().String()).
				ToCql(),
		)
	}

	err := r.session.ExecuteBatch(batch)

	if err != nil {
		return err
	}

	return nil
}

func (r *CategoryCassandraRepository) CreateMedias(ctx context.Context, medias []*character.Media) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	for _, med := range medias {
		batch.Query(qb.Insert("media").LitColumn("id", med.ID().String()).LitColumn("title", med.Title()).ToCql())
	}

	err := r.session.ExecuteBatch(batch)

	if err != nil {
		return err
	}

	return nil
}
