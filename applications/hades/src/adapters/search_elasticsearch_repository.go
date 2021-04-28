package adapters

import (
	"overdoll/libraries/search"
)

type SearchElasticsearchRepository struct {
	store *search.Store
}

func NewSearchElasticsearchRepository(store *search.Store) SearchElasticsearchRepository {
	return SearchElasticsearchRepository{store: store}
}
