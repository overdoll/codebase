package seeders

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/adapters/seeders/data"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/database"
)

func afterSeeders(ctx context.Context, session gocqlx.Session) error {

	repository := adapters.NewPostsCassandraRepository(session, bootstrap.InitializeElasticSearchSession())

	if err := repository.IndexAllCharacters(ctx); err != nil {
		return err
	}

	if err := repository.IndexAllAudience(ctx); err != nil {
		return err
	}

	if err := repository.IndexAllCategories(ctx); err != nil {
		return err
	}

	if err := repository.IndexAllSeries(ctx); err != nil {
		return err
	}

	if err := repository.IndexAllPosts(ctx); err != nil {
		return err
	}

	return nil
}

var SeederConfig = database.SeederConfig{
	SeederFiles:     data.Files,
	SeederCallbacks: afterSeeders,
}
