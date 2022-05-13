package seeders

import (
	"context"
	"embed"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/database"
)

// Files contains seeders
//go:embed data/*.json
var files embed.FS

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

	return nil
}

var SeederConfig = database.SeederConfig{
	SeederFiles:     files,
	SeederCallbacks: afterSeeders,
}
