package adapters

import (
	"overdoll/libraries/elasticsearch"
)

type IndexElasticSearchRepository struct {
	store *search.Store
}

func NewIndexElasticSearchRepository(store *search.Store) IndexElasticSearchRepository {
	return IndexElasticSearchRepository{store: store}
}
