package indexes

import (
	"context"
	"overdoll/applications/parley/internal/adapters"
	"overdoll/applications/parley/internal/adapters/indexes/schema"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/cache"
)

func registerIndexes() cache.IndexRegistry {
	var reg = cache.IndexRegistry{}

	repository := adapters.NewReportCassandraElasticsearchRepository(bootstrap.InitializeDatabaseSession(), bootstrap.InitializeElasticSearchSession())

	reg.Add(adapters.PostReportsIndexName, schema.PostReportsSchema, func(ctx context.Context) error {
		return repository.IndexAllPostReports(ctx)
	})

	return reg
}

var IndexConfig = cache.IndexConfig{
	Prefix:   "parley",
	Registry: registerIndexes(),
}
