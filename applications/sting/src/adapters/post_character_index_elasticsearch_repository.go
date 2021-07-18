package adapters

import (
	"context"
	"encoding/json"
	"fmt"

	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/graphql/relay"
)

type CharacterDocument struct {
	Id        string        `json:"id"`
	Thumbnail string        `json:"thumbnail"`
	Name      string        `json:"name"`
	Media     MediaDocument `json:"media"`
}

const CharacterIndex = `
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

const SearchCharacters = `
	"query" : {
		"multi_match" : {
			"query" : %q,
			"fields" : ["name^100"],
			"operator" : "and"
		}
	},
	"size" : 5`

const AllCharacters = `
	"query" : { "match_all" : {} },
	"size" : 5`

const CharacterIndexName = "characters"

func MarshalCharacterToDocument(char *post.Character) *CharacterDocument {
	media := char.Media()

	return &CharacterDocument{
		Id:        char.ID(),
		Thumbnail: char.RawThumbnail(),
		Name:      char.Name(),
		Media: MediaDocument{
			Id:        media.ID(),
			Thumbnail: media.RawThumbnail(),
			Title:     media.Title(),
		},
	}
}

func (r PostsIndexElasticSearchRepository) SearchCharacters(ctx context.Context, cursor *relay.Cursor, search string) ([]*post.Character, *relay.Paging, error) {
	var query string

	if search == "" {
		query = AllCharacters
	} else {
		query = fmt.Sprintf(SearchCharacters, search)
	}

	response, err := r.store.Search(CharacterIndexName, query)

	if err != nil {
		return nil, nil, err
	}

	var characters []*post.Character

	for _, char := range response.Hits {

		var chr CharacterDocument

		err := json.Unmarshal(char, &chr)

		if err != nil {
			return nil, nil, err
		}

		newCharacter := post.UnmarshalCharacterFromDatabase(chr.Id, chr.Name, chr.Thumbnail, post.UnmarshalMediaFromDatabase(chr.Media.Id, chr.Media.Title, chr.Media.Thumbnail))
		newCharacter.Node = relay.NewNode(chr.Id)

		characters = append(characters, newCharacter)
	}

	return characters, nil, nil
}

func (r PostsIndexElasticSearchRepository) BulkIndexCharacters(ctx context.Context, characters []*post.Character) error {

	err := r.store.CreateBulkIndex(CharacterIndexName)

	if err != nil {
		return fmt.Errorf("error creating bulk indexer: %s", err)
	}

	// TODO: also bulk index media along with characters

	// Now we can safely start creating our documents
	for _, char := range characters {

		data := MarshalCharacterToDocument(char)

		err = r.store.AddToBulkIndex(data.Id, data)

		if err != nil {
			return fmt.Errorf("unexpected error: %s", err)
		}
	}

	if err := r.store.CloseBulkIndex(); err != nil {
		return fmt.Errorf("unexpected error: %s", err)
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeleteCharacterIndex(ctx context.Context) error {
	err := r.store.DeleteIndex(CharacterIndexName)

	if err != nil {

	}

	err = r.store.CreateIndex(CharacterIndexName, CharacterIndex)

	if err != nil {
		return fmt.Errorf("failed to create character index: %s", err)
	}

	return nil
}
