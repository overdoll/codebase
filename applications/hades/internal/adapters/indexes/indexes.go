package indexes

import (
	"context"
	"overdoll/applications/hades/internal/adapters"
	"overdoll/applications/hades/internal/adapters/indexes/schema"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/cache"
)

func getBillingRepository() adapters.BillingCassandraElasticsearchRepository {
	return adapters.NewBillingCassandraRepository(bootstrap.InitializeDatabaseSession(), bootstrap.InitializeElasticSearchSession())
}

func registerIndexes() cache.IndexRegistry {
	var reg = cache.NewIndexRegistry()

	reg.Add(adapters.AccountTransactionsIndexName, schema.AccountTransactionsSchema, func(ctx context.Context) error {
		return getBillingRepository().IndexAllAccountTransactions(ctx)
	})

	reg.Add(adapters.AccountClubSupporterSubscriptionsIndexName, schema.AccountClubSupporterSubscriptionsSchema, func(ctx context.Context) error {
		return getBillingRepository().IndexAllAccountClubSupporterSubscriptions(ctx)
	})

	return reg
}

var IndexConfig = cache.IndexConfig{
	Prefix:   adapters.CachePrefix,
	Registry: registerIndexes(),
}
