package adapters

import (
	"overdoll/libraries/search"
)

type PostDocument struct {
	Id            string   `json:"id"`
	ArtistId      string   `json:"artist_id"`
	ContributorId string   `json:"contributor_id"`
	Content       []string `json:"content"`
	Categories    []string `json:"categories"`
	Characters    []string `json:"characters"`
	PostedAt      string   `json:"posted_at"`
}

type PostIndexElasticSearchRepository struct {
	store *search.Store
}

func NewPostIndexElasticSearchRepository(store *search.Store) PostIndexElasticSearchRepository {
	return PostIndexElasticSearchRepository{store: store}
}
