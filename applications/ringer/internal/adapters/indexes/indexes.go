package indexes

import (
	"context"
	"overdoll/applications/ringer/internal/adapters"
	"overdoll/applications/ringer/internal/adapters/indexes/schema"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/cache"
)

func getPaymentRepository() adapters.PaymentCassandraElasticsearchRepository {
	return adapters.NewPaymentCassandraRepository(bootstrap.InitializeDatabaseSession(), bootstrap.InitializeElasticSearchSession())
}

func getPayoutRepository() adapters.PayoutCassandraElasticsearchRepository {
	return adapters.NewPayoutCassandraElasticsearchRepository(bootstrap.InitializeDatabaseSession(), bootstrap.InitializeElasticSearchSession())
}

func registerIndexes() cache.IndexRegistry {
	var reg = cache.NewIndexRegistry()

	reg.Add(adapters.ClubPayoutsIndexName, schema.PayoutsSchema, func(ctx context.Context) error {
		return getPayoutRepository().IndexAllClubPayouts(ctx)
	})

	reg.Add(adapters.ClubPaymentsIndexName, schema.PaymentsSchema, func(ctx context.Context) error {
		return getPaymentRepository().IndexAllClubPayments(ctx)
	})

	return reg
}

var IndexConfig = cache.IndexConfig{
	Prefix:   adapters.CachePrefix,
	Registry: registerIndexes(),
}
