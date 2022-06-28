package indexes

import (
	"context"
	"overdoll/applications/ringer/internal/adapters"
	"overdoll/applications/ringer/internal/adapters/indexes/schema"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/cache"
)

func registerIndexes() cache.IndexRegistry {
	var reg = cache.IndexRegistry{}

	paymentRepo := adapters.NewPaymentCassandraRepository(bootstrap.InitializeDatabaseSession(), bootstrap.InitializeElasticSearchSession())
	payoutRepo := adapters.NewPayoutCassandraElasticsearchRepository(bootstrap.InitializeDatabaseSession(), bootstrap.InitializeElasticSearchSession())

	reg.Add(adapters.ClubPayoutsIndexName, schema.PayoutsSchema, func(ctx context.Context) error {
		return payoutRepo.IndexAllClubPayouts(ctx)
	})

	reg.Add(adapters.ClubPaymentsIndexName, schema.PaymentsSchema, func(ctx context.Context) error {
		return paymentRepo.IndexAllClubPayments(ctx)
	})

	return reg
}

var IndexConfig = cache.IndexConfig{
	Prefix:   "ringer",
	Registry: registerIndexes(),
}
