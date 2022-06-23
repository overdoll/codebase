package migrations

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/libraries/bootstrap"
)

const searchHistoryIndex = `
{
	"mappings": {
		"dynamic": "true"
	}
}`

func addSearchHistoryIndex(ctx context.Context, session gocqlx.Session, ev migrate.CallbackEvent, name string) error {

	esClient := bootstrap.InitializeElasticSearchSession()

	_, err := esClient.PutMapping().Index(adapters.SearchHistoryIndexName).BodyString(searchHistoryIndex).Do(ctx)

	if err != nil {
		return err
	}

	return nil
}
