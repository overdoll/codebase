package seeders

import (
	"context"
	"embed"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/ringer/internal/adapters"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/database"
)

// Files contains seeders
//go:embed data/*.json
var files embed.FS

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
	SeederFiles:     files,
	SeederCallbacks: afterSeeders,
}
