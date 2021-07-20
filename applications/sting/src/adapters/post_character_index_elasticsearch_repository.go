package adapters

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/scan"
)

type characterDocument struct {
	Id        string        `json:"id"`
	Thumbnail string        `json:"thumbnail"`
	Name      string        `json:"name"`
	Media     mediaDocument `json:"media"`
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

func marshalCharacterToDocument(char *post.Character) *characterDocument {
	media := char.Media()

	return &characterDocument{
		Id:        char.ID(),
		Thumbnail: char.RawThumbnail(),
		Name:      char.Name(),
		Media: mediaDocument{
			Id:        media.ID(),
			Thumbnail: media.RawThumbnail(),
			Title:     media.Title(),
		},
	}
}

func (r PostsIndexElasticSearchRepository) SearchCharacters(ctx context.Context, cursor *paging.Cursor, search string) ([]*post.Character, *paging.Info, error) {
	var query string

	if search == "" {
		query = allCharacters
	} else {
		query = fmt.Sprintf(searchCharacters, search)
	}

	response, err := r.store.Search(characterIndexName, query)

	if err != nil {
		return nil, nil, err
	}

	var characters []*post.Character

	for _, char := range response.Hits {

		var chr characterDocument

		err := json.Unmarshal(char, &chr)

		if err != nil {
			return nil, nil, err
		}

		newCharacter := post.UnmarshalCharacterFromDatabase(chr.Id, chr.Name, chr.Thumbnail, post.UnmarshalMediaFromDatabase(chr.Media.Id, chr.Media.Title, chr.Media.Thumbnail))
		newCharacter.Node = paging.NewNode(chr.Id)

		characters = append(characters, newCharacter)
	}

	return characters, nil, nil
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

		if err := r.store.CreateBulkIndex(characterIndex); err != nil {
			return err
		}

		var m character

		for iter.StructScan(&m) {

			if err := r.store.AddToBulkIndex(m.Id, characterDocument{
				Id:        m.Id,
				Thumbnail: m.Thumbnail,
				Name:      m.Name,
				Media: mediaDocument{
					Id:        m.MediaId,
					Thumbnail: "",
					Title:     "",
				},
			}); err != nil {
				return err
			}
		}

		if err := r.store.CloseBulkIndex(); err != nil {
			return fmt.Errorf("unexpected error: %s", err)
		}

		return nil
	})

	if err != nil {
		return err
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
