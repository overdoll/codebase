package adapters

import (
	"context"
	"encoding/json"
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
	"overdoll/libraries/scan"
)

type characterDocument struct {
	Id                string            `json:"id"`
	Slug              string            `json:"slug"`
	ThumbnailResource string            `json:"thumbnail_resource"`
	Name              map[string]string `json:"name"`
	Series            seriesDocument    `json:"series"`
	CreatedAt         time.Time         `json:"created_at"`
	UpdatedAt         time.Time         `json:"updated_at"`
	TotalLikes        int               `json:"total_likes"`
	TotalPosts        int               `json:"total_posts"`
}

const CharacterIndexName = "sting.characters"

func marshalCharacterToDocument(char *post.Character) (*characterDocument, error) {

	marshalled, err := resource.MarshalResourceToDatabase(char.ThumbnailResource())

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
		Name:              localization.MarshalTranslationToDatabase(char.Name()),
		Slug:              char.Slug(),
		CreatedAt:         char.CreatedAt(),
		UpdatedAt:         char.UpdatedAt(),
		TotalLikes:        char.TotalLikes(),
		TotalPosts:        char.TotalPosts(),
		Series:            *marshalledSeries,
	}, nil
}

func (r PostsCassandraElasticsearchRepository) indexCharacter(ctx context.Context, character *post.Character) error {

	char, err := marshalCharacterToDocument(character)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(CharacterIndexName).
		Id(character.ID()).
		BodyJson(char).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to index character")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) SearchCharacters(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.CharacterFilters) ([]*post.Character, error) {

	builder := r.client.Search().
		Index(CharacterIndexName)

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

	if filter.Name() != nil {
		query.Must(
			elastic.
				NewMultiMatchQuery(filter.Name(), localization.GetESSearchFields("name")...).
				Type("best_fields"),
		)
	}

	if len(filter.Slugs()) > 0 {
		for _, id := range filter.Slugs() {
			query.Filter(elastic.NewTermQuery("slug", id))
		}

		query.Filter(elastic.NewTermQuery("series.slug", *filter.SeriesSlug()))
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search characters")
	}

	var characters []*post.Character

	for _, hit := range response.Hits.Hits {

		var chr characterDocument

		err := json.Unmarshal(hit.Source, &chr)

		if err != nil {
			return nil, errors.Wrap(err, "failed to unmarshal character document")
		}

		unmarshalledCharacterResource, err := r.resourceSerializer.UnmarshalResourceFromDatabase(ctx, chr.ThumbnailResource)

		if err != nil {
			return nil, err
		}

		unmarshalledSeriesResource, err := r.resourceSerializer.UnmarshalResourceFromDatabase(ctx, chr.Series.ThumbnailResource)

		if err != nil {
			return nil, err
		}

		newCharacter := post.UnmarshalCharacterFromDatabase(
			chr.Id,
			chr.Slug,
			chr.Name,
			unmarshalledCharacterResource,
			chr.TotalLikes,
			chr.TotalPosts,
			chr.CreatedAt,
			chr.UpdatedAt,
			post.UnmarshalSeriesFromDatabase(
				chr.Series.Id,
				chr.Series.Slug,
				chr.Series.Title,
				unmarshalledSeriesResource,
				chr.Series.TotalLikes,
				chr.Series.TotalPosts,
				chr.Series.CreatedAt,
				chr.Series.UpdatedAt,
			))
		newCharacter.Node = paging.NewNode(hit.Sort)

		characters = append(characters, newCharacter)
	}

	return characters, nil
}

func (r PostsCassandraElasticsearchRepository) IndexAllCharacters(ctx context.Context) error {

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, characterTable, func(iter *gocqlx.Iterx) error {

		var c character

		for iter.StructScan(&c) {

			var m series

			// get media connected to this character document
			if err := r.session.Query(seriesTable.Get()).Consistency(gocql.One).Bind(c.SeriesId).Get(&m); err != nil {
				return err
			}

			doc := characterDocument{
				Id:                c.Id,
				ThumbnailResource: c.ThumbnailResource,
				Name:              c.Name,
				Slug:              c.Slug,
				CreatedAt:         c.CreatedAt,
				UpdatedAt:         c.UpdatedAt,
				TotalLikes:        c.TotalLikes,
				TotalPosts:        c.TotalPosts,
				Series: seriesDocument{
					Id:                m.Id,
					ThumbnailResource: m.ThumbnailResource,
					Title:             m.Title,
					Slug:              m.Slug,
					CreatedAt:         m.CreatedAt,
					TotalLikes:        m.TotalLikes,
					TotalPosts:        c.TotalPosts,
				},
			}

			_, err := r.client.
				Index().
				Index(CharacterIndexName).
				Id(m.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return errors.Wrap(support.ParseElasticError(err), "failed to index characters")
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}
