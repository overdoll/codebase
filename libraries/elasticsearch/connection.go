package search

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/cenkalti/backoff/v4"
	"github.com/elastic/go-elasticsearch/v8"
)

// SearchResults wraps the Elasticsearch search response.
type SearchResults struct {
	Total int               `json:"total"`
	Hits  []json.RawMessage `json:"hits"`
}

type Store struct {
	es   *elasticsearch.Client
	ctx  context.Context
	bulk Bulk
}

func NewStore(context context.Context) (*Store, error) {
	retryBackoff := backoff.NewExponentialBackOff()

	client, err := elasticsearch.NewClient(elasticsearch.Config{
		Addresses: []string{
			os.Getenv("ELASTICSEARCH_URL"),
		},
		RetryOnStatus: []int{502, 503, 504, 429},
		RetryBackoff: func(i int) time.Duration {
			if i == 1 {
				retryBackoff.Reset()
			}
			return retryBackoff.NextBackOff()
		},
		// Retry up to 5 attempts
		MaxRetries: 5,
	})

	if err != nil {
		return nil, fmt.Errorf("failed to create elasticsearch session: %s", err)
	}

	return &Store{
		es:  client,
		ctx: context,
	}, nil
}

// GetClient - get the client instance, useful for manual queries or functions
func (s *Store) GetClient() *elasticsearch.Client {
	return s.es
}
