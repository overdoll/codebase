package seeders

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/adapters/seeders/data"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/database"
	"overdoll/libraries/resource"
)

func afterSeeders(ctx context.Context, session gocqlx.Session) error {

	serializer := resource.NewSerializer()
	es := bootstrap.InitializeElasticSearchSession()

	repository := adapters.NewPostsCassandraRepository(session, es, serializer)

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

	clubRepository := adapters.NewClubCassandraElasticsearchRepository(session, es, bootstrap.InitializeRedisSession(), serializer)

	if err := clubRepository.IndexAllClubs(ctx); err != nil {
		return err
	}

	if err := clubRepository.IndexAllClubMembers(ctx); err != nil {
		return err
	}

	return nil
}

var SeederConfig = database.SeederConfig{
	SeederFiles:     data.Files,
	SeederCallbacks: afterSeeders,
}
