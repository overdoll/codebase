package indexes

import (
	"context"
	"overdoll/applications/parley/internal/adapters"
	"overdoll/applications/parley/internal/adapters/indexes/schema"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/cache"
)

func getReportsRepository() adapters.ReportCassandraElasticsearchRepository {
	return adapters.NewReportCassandraElasticsearchRepository(bootstrap.InitializeDatabaseSession(), bootstrap.InitializeElasticSearchSession())
}

func registerIndexes() cache.IndexRegistry {
	var reg = cache.NewIndexRegistry()

	reg.Add(adapters.PostReportsIndexName, schema.PostReportsSchema, func(ctx context.Context) error {
		return getReportsRepository().IndexAllPostReports(ctx)
	})

	return reg
}

var IndexConfig = cache.IndexConfig{
	Prefix:   adapters.CachePrefix,
	Registry: registerIndexes(),
}
