package seeders

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/parley/internal/adapters"
	"overdoll/applications/parley/internal/adapters/seeders/data"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/database"
)

func afterSeeders(ctx context.Context, session gocqlx.Session) error {

	repository := adapters.NewReportCassandraElasticsearchRepository(session, bootstrap.InitializeElasticSearchSession())

	if err := repository.IndexAllPostReports(ctx); err != nil {
		return err
	}

	return nil
}

var SeederConfig = database.SeederConfig{
	SeederFiles:     data.Files,
	SeederCallbacks: afterSeeders,
}
