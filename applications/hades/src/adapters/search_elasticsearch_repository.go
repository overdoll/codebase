package adapters

import (
	"overdoll/libraries/search"
)

type ElasticsearchRepository struct {
	store *search.Store
}

func NewElasticsearchRepository(store *search.Store) ElasticsearchRepository {
	return ElasticsearchRepository{store: store}
}
