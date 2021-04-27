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

type Media struct {
	Id        string `db:"id"`
	Title     string `db:"title"`
	Thumbnail string `db:"thumbnail"`
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
		Query(r.session)

	var characterModels []*Character

	if err := queryCharacters.Select(&characterModels); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	var mediaIds []string

	for _, cat := range characterModels {
		mediaIds = append(mediaIds, cat.MediaId)
	}

	queryMedia := qb.Select("media").
		Where(qb.InLit("id", "("+strings.Join(mediaIds, ",")+")")).
		Query(r.session)

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
	qm := qb.Select("media").Columns("id", "thumbnail", "title").Query(r.session)

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

func (r PostsCassandraRepository) GetMedias(ctx context.Context) ([]*post.Media, error) {
	var dbMed []Media

	qc := qb.Select("media").Columns("id", "title", "thumbnail").Query(r.session)

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

	final := []string{}

	for _, str := range medi {
		final = append(final, `'`+str+`'`)
	}

	// if none then we get out or else the query will fail
	if len(final) == 0 {
		return medias, nil
	}

	queryMedia := qb.Select("media").
		Where(qb.InLit("id", "("+strings.Join(final, ",")+")")).
		Query(r.session)

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

func (r PostsCassandraRepository) CreateCharacters(ctx context.Context, characters []*post.Character) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	for _, chars := range characters {

		media := chars.Media()

		batch.Query(
			qb.Insert("characters").
				LitColumn("id", chars.ID()).
				LitColumn("name", chars.Name()).
				LitColumn("thumbnail", chars.RawThumbnail()).
				LitColumn("media_id", media.ID()).
				ToCql(),
		)
	}

	err := r.session.ExecuteBatch(batch)

	if err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraRepository) CreateMedias(ctx context.Context, medias []*post.Media) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	for _, med := range medias {
		batch.Query(qb.Insert("media").
			LitColumn("id", med.ID()).
			LitColumn("title", med.Title()).
			LitColumn("thumbnail", med.RawThumbnail()).
			ToCql())
	}

	err := r.session.ExecuteBatch(batch)

	if err != nil {
		return err
	}

	return nil
}
