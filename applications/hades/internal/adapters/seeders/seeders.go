package seeders

import (
	"context"
	"embed"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/hades/internal/adapters"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/database"
)

// Files contains seeders
//go:embed data/*.json
var files embed.FS

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
	SeederFiles:     files,
	SeederCallbacks: afterSeeders,
}
