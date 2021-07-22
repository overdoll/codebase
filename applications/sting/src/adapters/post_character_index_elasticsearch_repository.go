package adapters

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/gocql/gocql"
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
					}
				}
			}
		}
	}
}`

const searchCharacters = `
	"query" : {
		"multi_match" : {
			"query" : %q,
			"fields" : ["name^100"],
			"operator" : "and"
		}
	},
	"size" : 5`

const allCharacters = `
	"query" : { "match_all" : {} },
	"size" : 5`

const characterIndexName = "characters"

func marshalCharacterToDocument(char *post.Character) (*characterDocument, error) {
	media := char.Media()

	parse, err := ksuid.Parse(char.ID())

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
		},
	}, nil
}

func (r PostsIndexElasticSearchRepository) IndexCharacters(ctx context.Context, characters []*post.Character) error {
	if err := r.store.CreateBulkIndex(characterIndex); err != nil {
		return err
	}

	for _, character := range characters {
		char, err := marshalCharacterToDocument(character)

		if err != nil {
			return err
		}

		if err := r.store.AddToBulkIndex(ctx, character.ID(), char); err != nil {
			return err
		}
	}

	if err := r.store.CloseBulkIndex(ctx); err != nil {
		return fmt.Errorf("unexpected error: %s", err)
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) SearchCharacters(ctx context.Context, cursor *paging.Cursor, search string) ([]*post.Character, error) {
	var query string

	if search == "" {
		query = allCharacters
	} else {
		query = fmt.Sprintf(searchCharacters, search)
	}

	response, err := r.store.Search(characterIndexName, query)

	if err != nil {
		return nil, err
	}

	var characters []*post.Character

	for _, char := range response.Hits {

		var chr characterDocument

		err := json.Unmarshal(char, &chr)

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

	if err := r.store.CreateBulkIndex(characterIndex); err != nil {
		return err
	}

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
			if err := r.session.Query(mediaTable.Get()).Consistency(gocql.One).Get(&m); err != nil {
				return err
			}

			parse, err := ksuid.Parse(m.Id)

			if err != nil {
				return err
			}

			if err := r.store.AddToBulkIndex(ctx, m.Id, characterDocument{
				Id:        c.Id,
				Thumbnail: c.Thumbnail,
				Name:      c.Name,
				CreatedAt: strconv.FormatInt(parse.Time().Unix(), 10),
				Media: mediaDocument{
					Id:        m.Id,
					Thumbnail: m.Thumbnail,
					Title:     m.Title,
				},
			}); err != nil {
				return err
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	if err := r.store.CloseBulkIndex(ctx); err != nil {
		return fmt.Errorf("unexpected error: %s", err)
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeleteCharacterIndex(ctx context.Context) error {

	err := r.store.DeleteIndex(characterIndexName)

	if err != nil {

	}

	err = r.store.CreateIndex(characterIndexName, characterIndex)

	if err != nil {
		return fmt.Errorf("failed to create character index: %s", err)
	}

	return nil
}
