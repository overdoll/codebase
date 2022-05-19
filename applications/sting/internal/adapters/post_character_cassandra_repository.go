package adapters

import (
	"context"
	"errors"
	"fmt"
	"overdoll/libraries/localization"
	"strings"

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
		"total_posts",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type character struct {
	Id                  string            `db:"id"`
	Slug                string            `db:"slug"`
	Name                map[string]string `db:"name"`
	ThumbnailResourceId *string           `db:"thumbnail_resource_id"`
	SeriesId            string            `db:"series_id"`
	TotalLikes          int               `db:"total_likes"`
	TotalPosts          int               `db:"total_posts"`
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

func marshalCharacterToDatabase(pending *post.Character) (*character, error) {
	return &character{
		Id:                  pending.ID(),
		Slug:                pending.Slug(),
		Name:                localization.MarshalTranslationToDatabase(pending.Name()),
		ThumbnailResourceId: pending.ThumbnailResourceId(),
		TotalLikes:          pending.TotalLikes(),
		TotalPosts:          pending.TotalPosts(),
		SeriesId:            pending.Series().ID(),
	}, nil
}

func (r PostsCassandraElasticsearchRepository) GetCharacterIdsFromSlugs(ctx context.Context, characterSlugs, seriesIds []string) ([]string, error) {

	var characterSlugResults []seriesSlug

	var lowercaseSlugs []string

	for _, s := range characterSlugs {
		lowercaseSlugs = append(lowercaseSlugs, strings.ToLower(s))
	}

	if err := qb.Select(charactersSlugTable.Name()).
		Where(qb.In("slug"), qb.In("series_id")).
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.One).
		BindMap(map[string]interface{}{
			"slug":      lowercaseSlugs,
			"series_id": seriesIds,
		}).
		SelectRelease(&characterSlugResults); err != nil {
		return nil, fmt.Errorf("failed to get character slugs: %v", err)
	}

	var ids []string

	for _, i := range characterSlugResults {
		ids = append(ids, i.Slug)
	}

	return ids, nil
}

func (r PostsCassandraElasticsearchRepository) GetCharacterBySlug(ctx context.Context, requester *principal.Principal, slug, seriesSlug string) (*post.Character, error) {

	// get series first
	series, err := r.getSeriesBySlug(ctx, requester, seriesSlug)

	if err != nil {
		return nil, err
	}

	var b characterSlug

	if err := r.session.
		Query(charactersSlugTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(characterSlug{
			Slug:     strings.ToLower(slug),
			SeriesId: series.SeriesId,
		}).
		GetRelease(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post.ErrCharacterNotFound
		}

		return nil, fmt.Errorf("failed to get character by slug: %v", err)
	}

	return r.GetCharacterById(ctx, requester, b.CharacterId)
}

func (r PostsCassandraElasticsearchRepository) GetCharactersByIds(ctx context.Context, requester *principal.Principal, chars []string) ([]*post.Character, error) {

	var characters []*post.Character

	// if none then we get out or else the query will fail
	if len(chars) == 0 {
		return characters, nil
	}

	var characterModels []*character

	if err := qb.Select(characterTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		Bind(chars).
		SelectRelease(&characterModels); err != nil {
		return nil, fmt.Errorf("failed to get characters by id: %v", err)
	}

	if len(chars) != len(characterModels) {
		return nil, errors.New("invalid character found")
	}

	var mediaIds []string

	for _, cat := range characterModels {
		mediaIds = append(mediaIds, cat.SeriesId)
	}

	var mediaModels []*series

	if err := qb.Select(seriesTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.One).
		Bind(mediaIds).
		SelectRelease(&mediaModels); err != nil {
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
			char.TotalPosts,
			post.UnmarshalSeriesFromDatabase(
				serial.Id,
				serial.Slug,
				serial.Title,
				serial.ThumbnailResourceId,
				serial.TotalLikes,
				serial.TotalPosts,
			),
		))
	}

	return characters, nil
}

func (r PostsCassandraElasticsearchRepository) GetCharacterById(ctx context.Context, requester *principal.Principal, characterId string) (*post.Character, error) {
	return r.getCharacterById(ctx, characterId)
}

func (r PostsCassandraElasticsearchRepository) deleteUniqueCharacterSlug(ctx context.Context, seriesId, id, slug string) error {

	if err := r.session.
		Query(charactersSlugTable.DeleteBuilder().Existing().ToCql()).
		WithContext(ctx).
		BindStruct(characterSlug{Slug: strings.ToLower(slug), CharacterId: id, SeriesId: seriesId}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to release character slug: %v", err)
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) CreateCharacter(ctx context.Context, requester *principal.Principal, character *post.Character) error {

	char, err := marshalCharacterToDatabase(character)

	if err != nil {
		return err
	}

	// first, do a unique insert of club to ensure we reserve a unique slug
	applied, err := charactersSlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		WithContext(ctx).
		SerialConsistency(gocql.Serial).
		BindStruct(characterSlug{Slug: strings.ToLower(char.Slug), CharacterId: char.Id, SeriesId: char.SeriesId}).
		ExecCASRelease()

	if err != nil {
		return fmt.Errorf("failed to create unique character slug: %v", err)
	}

	if !applied {
		return post.ErrCharacterSlugNotUnique
	}

	if err := r.session.
		Query(characterTable.Insert()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(char).
		ExecRelease(); err != nil {

		// release the slug
		if err := r.deleteUniqueCharacterSlug(ctx, char.SeriesId, char.Id, char.Slug); err != nil {
			return err
		}

		return err
	}

	if err := r.indexCharacter(ctx, character); err != nil {

		// release the slug
		if err := r.deleteUniqueCharacterSlug(ctx, char.SeriesId, char.Id, char.Slug); err != nil {
			return err
		}

		// failed to index character - delete character record
		if err := r.session.
			Query(characterTable.Delete()).
			WithContext(ctx).
			Consistency(gocql.LocalQuorum).
			BindStruct(char).
			ExecRelease(); err != nil {
			return err
		}

		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) UpdateCharacterThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(character *post.Character) error) (*post.Character, error) {
	return r.updateCharacter(ctx, id, updateFn, []string{"thumbnail_resource_id"})
}

func (r PostsCassandraElasticsearchRepository) UpdateCharacterName(ctx context.Context, requester *principal.Principal, id string, updateFn func(character *post.Character) error) (*post.Character, error) {
	return r.updateCharacter(ctx, id, updateFn, []string{"name"})
}

func (r PostsCassandraElasticsearchRepository) UpdateCharacterTotalPostsOperator(ctx context.Context, id string, updateFn func(character *post.Character) error) (*post.Character, error) {
	return r.updateCharacter(ctx, id, updateFn, []string{"total_posts"})
}

func (r PostsCassandraElasticsearchRepository) UpdateCharacterTotalLikesOperator(ctx context.Context, id string, updateFn func(character *post.Character) error) (*post.Character, error) {
	return r.updateCharacter(ctx, id, updateFn, []string{"total_likes"})
}

func (r PostsCassandraElasticsearchRepository) updateCharacter(ctx context.Context, id string, updateFn func(char *post.Character) error, columns []string) (*post.Character, error) {

	char, err := r.getCharacterById(ctx, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(char)

	if err != nil {
		return nil, err
	}

	pst, err := marshalCharacterToDatabase(char)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(characterTable.Update(
			columns...,
		)).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update character: %v", err)
	}

	if err := r.indexCharacter(ctx, char); err != nil {
		return nil, err
	}

	return char, nil
}

func (r PostsCassandraElasticsearchRepository) getCharacterById(ctx context.Context, characterId string) (*post.Character, error) {

	var char character

	if err := r.session.
		Query(characterTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(character{Id: characterId}).
		GetRelease(&char); err != nil {

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
		char.TotalPosts,
		media,
	), nil
}
