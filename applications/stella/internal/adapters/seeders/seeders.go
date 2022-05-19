package seeders

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/stella/internal/adapters"
	"overdoll/applications/stella/internal/adapters/seeders/data"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/database"
)

func afterSeeders(ctx context.Context, session gocqlx.Session) error {

	repository := adapters.NewClubCassandraElasticsearchRepository(session, bootstrap.InitializeElasticSearchSession())

	if err := repository.IndexAllClubs(ctx); err != nil {
		return err
	}

	if err := repository.IndexAllClubMembers(ctx); err != nil {
		return err
	}

	return nil
}

var SeederConfig = database.SeederConfig{
	SeederFiles:     data.Files,
	SeederCallbacks: afterSeeders,
}
