package adapters

import (
	"context"
	"go.uber.org/zap"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/localization"
	"overdoll/libraries/media"
	"overdoll/libraries/support"
	"strings"
	"time"

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
		"thumbnail_resource",
		"banner_resource",
		"thumbnail_media",
		"banner_media",
		"series_id",
		"club_id",
		"total_likes",
		"total_posts",
		"created_at",
		"updated_at",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type character struct {
	Id                string            `db:"id"`
	Slug              string            `db:"slug"`
	Name              map[string]string `db:"name"`
	ThumbnailResource string            `db:"thumbnail_resource"`
	BannerResource    string            `db:"banner_resource"`
	ThumbnailMedia    *string           `db:"thumbnail_media"`
	BannerMedia       *string           `db:"banner_media"`
	SeriesId          *string           `db:"series_id"`
	ClubId            *string           `db:"club_id"`
	TotalLikes        int               `db:"total_likes"`
	TotalPosts        int               `db:"total_posts"`
	CreatedAt         time.Time         `db:"created_at"`
	UpdatedAt         time.Time         `db:"updated_at"`
}

var charactersSlugTable = table.New(table.Metadata{
	Name: "characters_slugs",
	Columns: []string{
		"character_id",
		"series_or_club_id",
		"is_club_id",
		"slug",
	},
	PartKey: []string{"slug", "series_or_club_id"},
	SortKey: []string{},
})

type characterSlug struct {
	SeriesOrClubId string `db:"series_or_club_id"`
	IsClubId       bool   `db:"is_club_id"`
	CharacterId    string `db:"character_id"`
	Slug           string `db:"slug"`
}

func marshalCharacterToDatabase(pending *post.Character) (*character, error) {

	marshalledThumbnail, err := media.MarshalMediaToDatabase(pending.ThumbnailMedia())

	if err != nil {
		return nil, err
	}

	marshalledBanner, err := media.MarshalMediaToDatabase(pending.BannerMedia())

	if err != nil {
		return nil, err
	}

	return &character{
		Id:                pending.ID(),
		Slug:              pending.Slug(),
		Name:              localization.MarshalTranslationToDatabase(pending.Name()),
		ThumbnailMedia:    marshalledThumbnail,
		BannerMedia:       marshalledBanner,
		BannerResource:    pending.BannerMedia().LegacyResource(),
		ThumbnailResource: pending.ThumbnailMedia().LegacyResource(),
		TotalLikes:        pending.TotalLikes(),
		TotalPosts:        pending.TotalPosts(),
		SeriesId:          pending.SeriesId(),
		ClubId:            pending.ClubId(),
		CreatedAt:         pending.CreatedAt(),
		UpdatedAt:         pending.UpdatedAt(),
	}, nil
}

func (r PostsCassandraElasticsearchRepository) unmarshalCharacterFromDatabase(ctx context.Context, char *character, serial *series) (*post.Character, error) {

	unmarshalledCharacterThumbnail, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, char.ThumbnailResource, char.ThumbnailMedia)

	if err != nil {
		return nil, err
	}

	unmarshalledCharacterBanner, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, char.BannerResource, char.BannerMedia)

	if err != nil {
		return nil, err
	}

	var series *post.Series

	if serial != nil {

		unmarshalledSeriesThumbnail, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, serial.ThumbnailResource, serial.ThumbnailMedia)

		if err != nil {
			return nil, err
		}

		unmarshalledSeriesBanner, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, serial.BannerResource, serial.BannerMedia)

		if err != nil {
			return nil, err
		}

		series = post.UnmarshalSeriesFromDatabase(
			serial.Id,
			serial.Slug,
			serial.Title,
			serial.ThumbnailResource,
			serial.BannerResource,
			unmarshalledSeriesThumbnail,
			unmarshalledSeriesBanner,
			serial.TotalLikes,
			serial.TotalPosts,
			serial.CreatedAt,
			serial.UpdatedAt,
		)
	}

	return post.UnmarshalCharacterFromDatabase(
		char.Id,
		char.Slug,
		char.Name,
		unmarshalledCharacterThumbnail,
		unmarshalledCharacterBanner,
		char.TotalLikes,
		char.TotalPosts,
		char.CreatedAt,
		char.UpdatedAt,
		series,
		char.ClubId,
	), nil
}

func (r PostsCassandraElasticsearchRepository) GetCharacterIdsFromSlugs(ctx context.Context, characterSlugs, seriesOrClubIds []string) ([]string, error) {

	var characterSlugResults []characterSlug

	var lowercaseSlugs []string

	for _, s := range characterSlugs {
		lowercaseSlugs = append(lowercaseSlugs, strings.ToLower(s))
	}

	if err := qb.Select(charactersSlugTable.Name()).
		Where(qb.In("slug"), qb.In("series_or_club_id")).
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.One).
		BindMap(map[string]interface{}{
			"slug":              lowercaseSlugs,
			"series_or_club_id": seriesOrClubIds,
		}).
		SelectRelease(&characterSlugResults); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get character slugs")
	}

	var ids []string

	for _, i := range characterSlugResults {
		ids = append(ids, i.CharacterId)
	}

	return ids, nil
}

func (r PostsCassandraElasticsearchRepository) GetCharacterBySlug(ctx context.Context, slug string, seriesSlug, clubSlug *string) (*post.Character, error) {

	var id string

	if seriesSlug != nil {
		// get series first
		series, err := r.getSeriesBySlug(ctx, *seriesSlug)

		if err != nil {
			return nil, err
		}

		id = series.SeriesId
	}

	if clubSlug != nil {
		// get series first
		clb, err := r.getClubBySlug(ctx, *clubSlug)

		if err != nil {
			return nil, err
		}

		id = clb.ClubId
	}

	var b characterSlug

	if err := r.session.
		Query(charactersSlugTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(characterSlug{
			Slug:           strings.ToLower(slug),
			SeriesOrClubId: id,
		}).
		GetRelease(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("character", slug)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get character by slug")
	}

	return r.GetCharacterById(ctx, b.CharacterId)
}

func (r PostsCassandraElasticsearchRepository) UpdateCharacterSlug(ctx context.Context, id, slug string, keepOld bool) error {

	char, err := r.getRawCharacterById(ctx, id)

	if err != nil {
		return err
	}

	var targetId string

	if char.SeriesId != nil {
		targetId = *char.SeriesId
	}

	if char.ClubId != nil {
		targetId = *char.ClubId
	}

	// first, do a unique insert of club to ensure we reserve a unique slug
	applied, err := charactersSlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		WithContext(ctx).
		SerialConsistency(gocql.Serial).
		BindStruct(characterSlug{Slug: strings.ToLower(slug), CharacterId: char.Id, SeriesOrClubId: targetId, IsClubId: char.ClubId != nil}).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create unique character slug")
	}

	if !applied {
		zap.S().Infow("slug already exists, will perform local update", zap.String("slug", slug))
	}

	if applied && !keepOld {

		var seriesOrClubId string

		if char.SeriesId != nil {
			seriesOrClubId = *char.SeriesId
		} else {
			seriesOrClubId = *char.ClubId
		}

		if err := r.deleteUniqueCharacterSlug(ctx, seriesOrClubId, id, char.Slug); err != nil {
			return err
		}
	}

	char.Slug = slug

	if err := r.session.
		Query(characterTable.Update("slug")).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(char).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to update character slug")
	}

	var media *series

	if char.SeriesId != nil {
		media, err = r.getSingleSeriesById(ctx, *char.SeriesId)

		if err != nil {
			return err
		}
	}

	unmarshalled, err := r.unmarshalCharacterFromDatabase(ctx, char, media)

	if err != nil {
		return err
	}

	if err := r.indexCharacter(ctx, unmarshalled); err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) GetCharacterById(ctx context.Context, characterId string) (*post.Character, error) {
	return r.getCharacterById(ctx, characterId)
}

func (r PostsCassandraElasticsearchRepository) deleteUniqueCharacterSlug(ctx context.Context, seriesId, id, slug string) error {

	if err := r.session.
		Query(charactersSlugTable.DeleteBuilder().Existing().ToCql()).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(characterSlug{Slug: strings.ToLower(slug), CharacterId: id, SeriesOrClubId: seriesId}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to release character slug")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) CreateCharacter(ctx context.Context, character *post.Character) error {

	char, err := marshalCharacterToDatabase(character)

	if err != nil {
		return err
	}

	var id string

	if char.SeriesId != nil {
		id = *char.SeriesId
	}

	if char.ClubId != nil {
		id = *char.ClubId
	}

	// first, do a unique insert of club to ensure we reserve a unique slug
	applied, err := charactersSlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		WithContext(ctx).
		SerialConsistency(gocql.Serial).
		BindStruct(characterSlug{Slug: strings.ToLower(char.Slug), CharacterId: char.Id, SeriesOrClubId: id, IsClubId: char.ClubId != nil}).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create unique character slug")
	}

	if !applied {
		return post.ErrCharacterSlugNotUnique
	}

	if err := r.session.
		Query(characterTable.Insert()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(char).
		ExecRelease(); err != nil {

		// release the slug
		if err := r.deleteUniqueCharacterSlug(ctx, id, char.Id, char.Slug); err != nil {
			return err
		}

		return err
	}

	// add to club's characters list
	if char.ClubId != nil {
		if err := r.session.
			Query(clubCharactersTable.Insert()).
			WithContext(ctx).
			Idempotent(true).
			Consistency(gocql.LocalQuorum).
			BindStruct(clubCharacters{CharacterId: char.Id, ClubId: *char.ClubId}).
			ExecRelease(); err != nil {

			// release the slug
			if err := r.deleteUniqueCharacterSlug(ctx, id, char.Id, char.Slug); err != nil {
				return err
			}

			return err
		}
	}

	if err := r.indexCharacter(ctx, character); err != nil {

		// release the slug
		if err := r.deleteUniqueCharacterSlug(ctx, id, char.Id, char.Slug); err != nil {
			return err
		}

		// failed to index character - delete character record
		if err := r.session.
			Query(characterTable.Delete()).
			WithContext(ctx).
			Idempotent(true).
			Consistency(gocql.LocalQuorum).
			BindStruct(char).
			ExecRelease(); err != nil {
			return errors.Wrap(support.NewGocqlError(err), "failed to delete character")
		}

		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) UpdateCharacterThumbnailOperator(ctx context.Context, id string, updateFn func(character *post.Character) error) (*post.Character, error) {
	return r.updateCharacter(ctx, id, updateFn, []string{"thumbnail_resource"})
}

func (r PostsCassandraElasticsearchRepository) UpdateCharacterThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(character *post.Character) error) (*post.Character, error) {
	return r.updateCharacter(ctx, id, updateFn, []string{"thumbnail_resource"})
}

func (r PostsCassandraElasticsearchRepository) UpdateCharacterBannerOperator(ctx context.Context, id string, updateFn func(character *post.Character) error) (*post.Character, error) {
	return r.updateCharacter(ctx, id, updateFn, []string{"banner_resource"})
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

	if err := updateFn(char); err != nil {
		return nil, err
	}

	pst, err := marshalCharacterToDatabase(char)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(characterTable.Update(
			append(columns, "updated_at")...,
		)).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update character")
	}

	if err := r.indexCharacter(ctx, char); err != nil {
		return nil, err
	}

	return char, nil
}

func (r PostsCassandraElasticsearchRepository) getRawCharacterById(ctx context.Context, characterId string) (*character, error) {

	var char character

	if err := r.session.
		Query(characterTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(character{Id: characterId}).
		GetRelease(&char); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("character", characterId)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get characters by id")
	}

	return &char, nil
}

func (r PostsCassandraElasticsearchRepository) getCharacterById(ctx context.Context, characterId string) (*post.Character, error) {

	char, err := r.getRawCharacterById(ctx, characterId)

	if err != nil {
		return nil, err
	}

	var media *series

	if char.SeriesId != nil {
		media, err = r.getSingleSeriesById(ctx, *char.SeriesId)

		if err != nil {
			return nil, err
		}
	}

	unmarshalled, err := r.unmarshalCharacterFromDatabase(ctx, char, media)

	if err != nil {
		return nil, err
	}

	return unmarshalled, nil
}
