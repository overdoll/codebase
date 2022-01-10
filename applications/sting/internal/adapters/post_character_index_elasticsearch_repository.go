package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strconv"

	"github.com/gocql/gocql"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"github.com/segmentio/ksuid"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
)

type characterDocument struct {
	Id                  string            `json:"id"`
	Slug                string            `json:"slug"`
	ThumbnailResourceId string            `json:"thumbnail_resource_id"`
	Name                map[string]string `json:"name"`
	Series              seriesDocument    `json:"series"`
	CreatedAt           string            `json:"created_at"`
	TotalLikes          int               `json:"total_likes"`
}

const characterIndexProperties = `
{
	"id": {
		"type": "keyword"
	},
	"slug": {
		"type": "keyword"
	},
	"thumbnail_resource_id": {
		"type": "keyword"
	},
	"name": ` + localization.ESIndex + `
	"created_at": {
		"type": "date"
	},
	"total_likes": {
		"type": "integer"
	},
	"series": {
		"type": "nested",
		"properties": ` + seriesIndexProperties + ` 
	}
}
`

const characterIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": ` + characterIndexProperties + `
	}
}`

const characterIndexName = "characters"

func marshalCharacterToDocument(char *post.Character) (*characterDocument, error) {
	parse, err := ksuid.Parse(char.ID())

	if err != nil {
		return nil, err
	}

	seriesDoc, err := marshalSeriesToDocument(char.Series())

	if err != nil {
		return nil, err
	}

	return &characterDocument{
		Id:                  char.ID(),
		ThumbnailResourceId: char.ThumbnailResourceId(),
		Name:                localization.MarshalTranslationToDatabase(char.Name()),
		Slug:                char.Slug(),
		CreatedAt:           strconv.FormatInt(parse.Time().Unix(), 10),
		TotalLikes:          char.TotalLikes(),
		Series:              *seriesDoc,
	}, nil
}

func (r PostsIndexElasticSearchRepository) IndexCharacter(ctx context.Context, character *post.Character) error {

	char, err := marshalCharacterToDocument(character)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(characterIndexName).
		Id(character.ID()).
		BodyJson(char).
		Do(ctx)

	if err != nil {
		return err
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) SearchCharacters(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.CharacterFilters) ([]*post.Character, error) {

	builder := r.client.Search().
		Index(characterIndexName)

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	query := cursor.BuildElasticsearch(builder, "created_at")

	if filter.Name() != nil {
		query.Must(
			elastic.
				NewMultiMatchQuery(*filter.Name(), localization.GetESSearchFields("name")...).
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
		return nil, err
	}

	var characters []*post.Character

	for _, hit := range response.Hits.Hits {

		var chr characterDocument

		err := json.Unmarshal(hit.Source, &chr)

		if err != nil {
			return nil, err
		}

		newCharacter := post.UnmarshalCharacterFromDatabase(chr.Id, chr.Slug, chr.Name, chr.ThumbnailResourceId, chr.TotalLikes, post.UnmarshalSeriesFromDatabase(chr.Series.Id, chr.Series.Slug, chr.Series.Title, chr.Series.ThumbnailResourceId, chr.Series.TotalLikes))
		newCharacter.Node = paging.NewNode(chr.CreatedAt)

		characters = append(characters, newCharacter)
	}

	return characters, nil
}

func (r PostsIndexElasticSearchRepository) IndexAllCharacters(ctx context.Context) error {

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

			parse, err := ksuid.Parse(c.Id)

			if err != nil {
				return err
			}

			parse2, err := ksuid.Parse(m.Id)

			if err != nil {
				return err
			}

			doc := characterDocument{
				Id:                  c.Id,
				ThumbnailResourceId: c.ThumbnailResourceId,
				Name:                c.Name,
				Slug:                c.Slug,
				CreatedAt:           strconv.FormatInt(parse.Time().Unix(), 10),
				TotalLikes:          c.TotalLikes,
				Series: seriesDocument{
					Id:                  m.Id,
					ThumbnailResourceId: m.ThumbnailResourceId,
					Title:               m.Title,
					Slug:                m.Slug,
					CreatedAt:           strconv.FormatInt(parse2.Time().Unix(), 10),
					TotalLikes:          m.TotalLikes,
				},
			}

			_, err = r.client.
				Index().
				Index(characterIndexName).
				Id(m.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return fmt.Errorf("failed to index characters: %v", err)
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeleteCharacterIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(characterIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(characterIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(characterIndexName).BodyString(characterIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}
