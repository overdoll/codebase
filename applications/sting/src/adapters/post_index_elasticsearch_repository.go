package adapters

import (
	"overdoll/libraries/search"
)

type PostDocument struct {
	Id          string              `json:"id"`
	Artist      ArtistDocument      `json:"artist"`
	Contributor ContributorDocument `json:"contributor"`
	Content     []string            `json:"content"`
	Categories  []CategoryDocument  `json:"categories"`
	Characters  []CharacterDocument `json:"characters"`
	PostedAt    string              `json:"posted_at"`
}

type ContributorDocument struct {
	Id       string `json:"id"`
	Avatar   string `json:"avatar"`
	Username string `json:"username"`
}

const PostIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
			"id": {
				"type": "keyword"
			}
		}
	}
}`

const ContributorIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
			"id": {
				"type": "keyword"
			}
		}
	}
}`

type PostIndexElasticSearchRepository struct {
	store *search.Store
}

func NewPostIndexElasticSearchRepository(store *search.Store) PostIndexElasticSearchRepository {
	return PostIndexElasticSearchRepository{store: store}
}
