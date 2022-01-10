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
		"thumbnail_resource_id",
		"series_id",
		"total_likes",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type character struct {
	Id                  string            `db:"id"`
	Slug                string            `db:"slug"`
	Name                map[string]string `db:"name"`
	ThumbnailResourceId string            `db:"thumbnail_resource_id"`
	SeriesId            string            `db:"series_id"`
	TotalLikes          int               `db:"total_likes"`
}

var charactersSlugTable = table.New(table.Metadata{
	Name: "characters_slugs",
	Columns: []string{
		"character_id",
		"series_id",
		"slug",
	},
	PartKey: []string{"slug", "series_id"},
	SortKey: []string{},
})

type characterSlug struct {
	SeriesId    string `db:"series_id"`
	CharacterId string `db:"character_id"`
	Slug        string `db:"slug"`
}

func (r PostsCassandraRepository) GetCharacterBySlug(ctx context.Context, requester *principal.Principal, slug, seriesSlug string) (*post.Character, error) {

	// get series first
	series, err := r.getSeriesBySlug(ctx, requester, seriesSlug)

	if err != nil {
		return nil, err
	}

	queryCharacterSlug := r.session.
		Query(charactersSlugTable.Get()).
		Consistency(gocql.One).
		BindStruct(characterSlug{
			Slug:     slug,
			SeriesId: series.SeriesId,
		})

	var b characterSlug

	if err := queryCharacterSlug.Get(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrCharacterNotFound
		}

		return nil, fmt.Errorf("failed to get character by slug: %v", err)
	}

	return r.GetCharacterById(ctx, requester, b.CharacterId)
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
			char.ThumbnailResourceId,
			char.TotalLikes,
			post.UnmarshalSeriesFromDatabase(
				serial.Id,
				serial.Slug,
				serial.Title,
				serial.ThumbnailResourceId,
				serial.TotalLikes,
			),
		))
	}

	return characters, nil
}

func (r PostsCassandraRepository) GetCharacterById(ctx context.Context, requester *principal.Principal, characterId string) (*post.Character, error) {
	return r.getCharacterById(ctx, characterId)
}

func (r PostsCassandraRepository) getCharacterById(ctx context.Context, characterId string) (*post.Character, error) {

	queryCharacters := r.session.
		Query(characterTable.Get()).
		Consistency(gocql.One).
		BindStruct(character{Id: characterId})

	var char character

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
		char.ThumbnailResourceId,
		char.TotalLikes,
		media,
	), nil
}
