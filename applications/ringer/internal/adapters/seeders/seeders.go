package seeders

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/ringer/internal/adapters"
	"overdoll/applications/ringer/internal/adapters/seeders/data"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/database"
)

func afterSeeders(ctx context.Context, session gocqlx.Session) error {

	repository := adapters.NewPaymentCassandraRepository(session, bootstrap.InitializeElasticSearchSession())

	if err := repository.IndexAllClubPayments(ctx); err != nil {
		return err
	}

	repository2 := adapters.NewPayoutCassandraElasticsearchRepository(session, bootstrap.InitializeElasticSearchSession())

	if err := repository2.IndexAllClubPayouts(ctx); err != nil {
		return err
	}

	return nil
}

var SeederConfig = database.SeederConfig{
	SeederFiles:     data.Files,
	SeederCallbacks: afterSeeders,
}
