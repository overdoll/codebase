package indexes

import (
	"context"
	"overdoll/applications/hades/internal/adapters"
	"overdoll/applications/hades/internal/adapters/indexes/schema"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/cache"
)

func registerIndexes() cache.IndexRegistry {
	var reg = cache.IndexRegistry{}

	repository := adapters.NewBillingCassandraRepository(bootstrap.InitializeDatabaseSession(), bootstrap.InitializeElasticSearchSession())

	reg.Add(adapters.AccountTransactionsIndexName, schema.AccountTransactionsSchema, func(ctx context.Context) error {
		return repository.IndexAllAccountTransactions(ctx)
	})

	reg.Add(adapters.AccountClubSupporterSubscriptionsIndexName, schema.AccountClubSupporterSubscriptionsSchema, func(ctx context.Context) error {
		return repository.IndexAllAccountClubSupporterSubscriptions(ctx)
	})

	return reg
}

var IndexConfig = cache.IndexConfig{
	Prefix:   "hades",
	Registry: registerIndexes(),
}
