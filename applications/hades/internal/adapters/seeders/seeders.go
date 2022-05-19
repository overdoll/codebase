package seeders

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/hades/internal/adapters"
	"overdoll/applications/hades/internal/adapters/seeders/data"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/database"
)

func afterSeeders(ctx context.Context, session gocqlx.Session) error {

	repository := adapters.NewBillingCassandraRepository(session, bootstrap.InitializeElasticSearchSession())

	if err := repository.IndexAllAccountTransactions(ctx); err != nil {
		return err
	}

	if err := repository.IndexAllAccountClubSupporterSubscriptions(ctx); err != nil {
		return err
	}

	return nil
}

var SeederConfig = database.SeederConfig{
	SeederFiles:     data.Files,
	SeederCallbacks: afterSeeders,
}
