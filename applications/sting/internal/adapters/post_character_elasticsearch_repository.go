package adapters

import (
	"context"
	"encoding/json"
	"go.uber.org/zap"
	"overdoll/libraries/cache"
	"overdoll/libraries/database"
	"overdoll/libraries/errors"
	"overdoll/libraries/resource"
	"overdoll/libraries/support"
	"time"

	"github.com/gocql/gocql"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type characterDocument struct {
	Id                string            `json:"id"`
	Slug              string            `json:"slug"`
	ThumbnailResource string            `json:"thumbnail_resource"`
	BannerResource    string            `json:"banner_resource"`
	Name              map[string]string `json:"name"`
	Series            *seriesDocument   `json:"series"`
	ClubId            *string           `json:"club_id"`
	CreatedAt         time.Time         `json:"created_at"`
	UpdatedAt         time.Time         `json:"updated_at"`
	TotalLikes        int               `json:"total_likes"`
	TotalPosts        int               `json:"total_posts"`
}

const CharacterIndexName = "characters"

var CharacterReaderIndex = cache.ReadAlias(CachePrefix, CharacterIndexName)
var characterWriterIndex = cache.WriteAlias(CachePrefix, CharacterIndexName)

func marshalCharacterToDocument(char *post.Character) (*characterDocument, error) {

	marshalled, err := resource.MarshalResourceToDatabase(char.ThumbnailResource())

	if err != nil {
		return nil, err
	}

	marshalledBanner, err := resource.MarshalResourceToDatabase(char.BannerResource())

	if err != nil {
		return nil, err
	}

	marshalledSeries, err := marshalSeriesToDocument(char.Series())

	if err != nil {
		return nil, err
	}

	return &characterDocument{
		Id:                char.ID(),
		ThumbnailResource: marshalled,
		BannerResource:    marshalledBanner,
		Name:              localization.MarshalTranslationToDatabase(char.Name()),
		ClubId:            char.ClubId(),
		Slug:              char.Slug(),
		CreatedAt:         char.CreatedAt(),
		UpdatedAt:         char.UpdatedAt(),
		TotalLikes:        char.TotalLikes(),
		TotalPosts:        char.TotalPosts(),
		Series:            marshalledSeries,
	}, nil
}

func (r PostsCassandraElasticsearchRepository) unmarshalCharacterDocument(ctx context.Context, source json.RawMessage, sort []interface{}) (*post.Character, error) {

	var chr characterDocument

	err := json.Unmarshal(source, &chr)

	if err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal character document")
	}

	unmarshalledCharacterResource, err := r.resourceSerializer.UnmarshalResourceFromDatabase(ctx, chr.ThumbnailResource)

	if err != nil {
		return nil, err
	}

	unmarshalledCharacterBannerResource, err := r.resourceSerializer.UnmarshalResourceFromDatabase(ctx, chr.BannerResource)

	if err != nil {
		return nil, err
	}

	var series *post.Series

	if chr.Series != nil {

		unmarshalledSeriesResource, err := r.resourceSerializer.UnmarshalResourceFromDatabase(ctx, chr.Series.ThumbnailResource)

		if err != nil {
			return nil, err
		}

		unmarshalledSeriesBannerResource, err := r.resourceSerializer.UnmarshalResourceFromDatabase(ctx, chr.Series.BannerResource)

		if err != nil {
			return nil, err
		}

		series = post.UnmarshalSeriesFromDatabase(
			chr.Series.Id,
			chr.Series.Slug,
			chr.Series.Title,
			unmarshalledSeriesResource,
			unmarshalledSeriesBannerResource,
			chr.Series.TotalLikes,
			chr.Series.TotalPosts,
			chr.Series.CreatedAt,
			chr.Series.UpdatedAt,
		)
	}

	newCharacter := post.UnmarshalCharacterFromDatabase(
		chr.Id,
		chr.Slug,
		chr.Name,
		unmarshalledCharacterResource,
		unmarshalledCharacterBannerResource,
		chr.TotalLikes,
		chr.TotalPosts,
		chr.CreatedAt,
		chr.UpdatedAt,
		series,
		chr.ClubId,
	)

	if sort != nil {
		newCharacter.Node = paging.NewNode(sort)
	}

	return newCharacter, nil
}

func (r PostsCassandraElasticsearchRepository) indexCharacter(ctx context.Context, character *post.Character) error {

	char, err := marshalCharacterToDocument(character)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(characterWriterIndex).
		Id(character.ID()).
		BodyJson(char).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to index character")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) GetCharactersByIds(ctx context.Context, characterIds []string) ([]*post.Character, error) {

	var characters []*post.Character

	if len(characterIds) == 0 {
		return characters, nil
	}

	builder := r.client.MultiGet().Realtime(false)

	for _, characterId := range characterIds {
		builder.Add(elastic.NewMultiGetItem().Id(characterId).Index(CharacterReaderIndex))
	}

	response, err := builder.Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed search characters")
	}

	for _, hit := range response.Docs {

		result, err := r.unmarshalCharacterDocument(ctx, hit.Source, nil)

		if err != nil {
			return nil, err
		}

		characters = append(characters, result)
	}

	return characters, nil
}

func (r PostsCassandraElasticsearchRepository) SearchCharacters(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.CharacterFilters) ([]*post.Character, error) {

	builder := r.client.Search().
		Index(CharacterReaderIndex)

	if cursor == nil {
		return nil, paging.ErrCursorNotPresent
	}

	var sortingColumn string
	var sortingAscending bool

	if filter.SortBy() == post.NewSort {
		sortingColumn = "created_at"
		sortingAscending = false
	} else if filter.SortBy() == post.TopSort {
		sortingColumn = "total_likes"
		sortingAscending = false
	} else if filter.SortBy() == post.PopularSort {
		sortingColumn = "total_posts"
		sortingAscending = false
	}

	if err := cursor.BuildElasticsearch(builder, sortingColumn, "id", sortingAscending); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	if filter.ClubCharacters() != nil {
		if *filter.ClubCharacters() {
			query.Filter(elastic.NewExistsQuery("club_id"))
		} else {
			query.Filter(elastic.NewExistsQuery("series"))
		}
	}

	if filter.Name() != nil {
		query.Must(
			elastic.
				NewMultiMatchQuery(filter.Name(), "name.en").
				Type("best_fields"),
		)
	}

	if len(filter.Slugs()) > 0 {
		for _, id := range filter.Slugs() {
			query.Filter(elastic.NewTermQuery("slug", id))
		}
	}

	if filter.SeriesSlug() != nil {
		query.Filter(elastic.NewTermQuery("series.slug", *filter.SeriesSlug()))
	}

	if filter.ClubId() != nil {
		query.Filter(elastic.NewTermQuery("club_id", *filter.ClubId()))
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search characters")
	}

	var characters []*post.Character

	for _, hit := range response.Hits.Hits {

		result, err := r.unmarshalCharacterDocument(ctx, hit.Source, hit.Sort)

		if err != nil {
			return nil, err
		}

		characters = append(characters, result)
	}

	return characters, nil
}

func (r PostsCassandraElasticsearchRepository) IndexAllCharacters(ctx context.Context) error {

	scanner := database.NewScan(r.session,
		database.ScanConfig{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, characterTable, func(iter *gocqlx.Iterx) error {

		var c character

		for iter.StructScan(&c) {

			var m *series

			if c.SeriesId != nil {
				// get media connected to this character document
				if err := r.session.Query(seriesTable.Get()).Consistency(gocql.One).Bind(*c.SeriesId).Get(&m); err != nil {
					return err
				}
			}

			unmarshalled, err := r.unmarshalCharacterFromDatabase(ctx, &c, m)

			if err != nil {
				return err
			}

			doc, err := marshalCharacterToDocument(unmarshalled)

			if err != nil {
				return err
			}

			_, err = r.client.
				Index().
				Index(characterWriterIndex).
				Id(doc.Id).
				BodyJson(doc).
				OpType("create").
				Do(ctx)

			if err != nil {
				e, ok := err.(*elastic.Error)
				if ok && e.Details.Type == "version_conflict_engine_exception" {
					zap.S().Infof("skipping document [%s] due to conflict", doc.Id)
				} else {
					return errors.Wrap(support.ParseElasticError(err), "failed to index characters")
				}
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}
