package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"strconv"

	"github.com/gocql/gocql"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"github.com/segmentio/ksuid"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/scan"
)

type characterDocument struct {
	Id        string        `json:"id"`
	Thumbnail string        `json:"thumbnail"`
	Name      string        `json:"name"`
	Media     mediaDocument `json:"media"`
	CreatedAt string        `json:"created_at"`
}

const characterIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
			"id": {
				"type": "keyword"
			},
			"thumbnail": {
				"type": "keyword"
			},
			"name": {
				"type": "text",
				"analyzer": "english"
			},
			"created_at": {
				"type": "date"
			},
			"media": {
				"type": "nested",
				"properties": {
					"id": {
						"type": "keyword"
					},
					"thumbnail": {
						"type": "keyword"
					},
					"title": {
						"type": "text",
						"analyzer": "english"
					},
					"created_at": {
						"type": "date"
					}
				}
			}
		}
	}
}`

const characterIndexName = "characters"

func marshalCharacterToDocument(char *post.Character) (*characterDocument, error) {
	media := char.Media()

	parse, err := ksuid.Parse(char.ID())

	if err != nil {
		return nil, err
	}

	parse2, err := ksuid.Parse(char.ID())

	if err != nil {
		return nil, err
	}

	return &characterDocument{
		Id:        char.ID(),
		Thumbnail: char.Thumbnail(),
		Name:      char.Name(),
		CreatedAt: strconv.FormatInt(parse.Time().Unix(), 10),
		Media: mediaDocument{
			Id:        media.ID(),
			Thumbnail: media.Thumbnail(),
			Title:     media.Title(),
			CreatedAt: strconv.FormatInt(parse2.Time().Unix(), 10),
		},
	}, nil
}

func (r PostsIndexElasticSearchRepository) IndexCharacters(ctx context.Context, characters []*post.Character) error {

	for _, character := range characters {
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
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) SearchCharacters(ctx context.Context, cursor *paging.Cursor, search string) ([]*post.Character, error) {

	builder := r.client.Search().
		Index(characterIndexName)

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	query := cursor.BuildElasticsearch(builder, "created_at")

	if search != "" {
		query.Must(elastic.NewMultiMatchQuery(search, "name").Operator("and"))
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

		newCharacter := post.UnmarshalCharacterFromDatabase(chr.Id, chr.Name, chr.Thumbnail, post.UnmarshalMediaFromDatabase(chr.Media.Id, chr.Media.Title, chr.Media.Thumbnail))
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

	err := scanner.RunIterator(characterTable, func(iter *gocqlx.Iterx) error {

		var c character

		for iter.StructScan(&c) {

			var m media

			// get media connected to this character document
			if err := r.session.Query(mediaTable.Get()).Consistency(gocql.One).Bind(c.MediaId).Get(&m); err != nil {
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
				Id:        c.Id,
				Thumbnail: c.Thumbnail,
				Name:      c.Name,
				CreatedAt: strconv.FormatInt(parse.Time().Unix(), 10),
				Media: mediaDocument{
					Id:        m.Id,
					Thumbnail: m.Thumbnail,
					Title:     m.Title,
					CreatedAt: strconv.FormatInt(parse2.Time().Unix(), 10),
				},
			}

			_, err = r.client.
				Index().
				Index(characterIndexName).
				Id(m.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return err
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

	if _, err := r.client.DeleteIndex(characterIndexName).Do(ctx); err != nil {
		// Handle error
		return err
	}

	if _, err := r.client.CreateIndex(characterIndexName).BodyString(characterIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}
