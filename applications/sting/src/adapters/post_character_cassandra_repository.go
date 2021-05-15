package adapters

import (
	"context"
	"fmt"
	"strings"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/sting/src/domain/post"
)

type Character struct {
	Id        string `db:"id"`
	Name      string `db:"name"`
	Thumbnail string `db:"thumbnail"`
	MediaId   string `db:"media_id"`
}

func (r PostsCassandraRepository) GetCharactersById(ctx context.Context, chars []string) ([]*post.Character, error) {

	var characters []*post.Character

	final := []string{}

	for _, str := range chars {
		final = append(final, `'`+str+`'`)
	}

	// if none then we get out or else the query will fail
	if len(final) == 0 {
		return characters, nil
	}

	queryCharacters := qb.Select("characters").
		Where(qb.InLit("id", "("+strings.Join(final, ",")+")")).
		Query(r.session).
		Consistency(gocql.One)

	var characterModels []*Character

	if err := queryCharacters.Select(&characterModels); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	var mediaIds []string

	for _, cat := range characterModels {
		mediaIds = append(mediaIds, cat.MediaId)
	}

	queryMedia := qb.Select("media").
		Where(qb.In("id")).
		Query(r.session).
		Consistency(gocql.One).
		Bind(mediaIds)

	var mediaModels []*Media

	if err := queryMedia.Select(&mediaModels); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	for _, char := range characterModels {

		var media *Media

		for _, med := range mediaModels {
			if med.Id == char.MediaId {
				media = med
				break
			}
		}

		if media == nil {
			continue
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

func (r PostsCassandraRepository) GetCharacters(ctx context.Context) ([]*post.Character, error) {
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
	qm := qb.Select("media").
		Columns("id", "thumbnail", "title").
		Query(r.session).
		Consistency(gocql.One)

	if err := qm.Select(&medias); err != nil {
		return nil, fmt.Errorf("select() failed: %s", err)
	}

	var characters []*post.Character

	// Now we can safely start creating our documents
	for _, char := range dbChars {

		var media Media

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

		stmt, _ := qb.Insert("characters").Columns("id", "name", "thumbnail", "media_id").ToCql()
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
