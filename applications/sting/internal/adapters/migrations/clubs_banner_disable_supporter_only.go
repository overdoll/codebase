package migrations

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/libraries/bootstrap"
)

const clubsBannerIndex = `
{
	"properties": {
		"banner_resource": {
			"type": "keyword"
		},
		"supporter_only_posts_disabled": {
			"type": "boolean"
		}
	}
}`

func addClubsBannerToIndex(ctx context.Context, session gocqlx.Session, ev migrate.CallbackEvent, name string) error {

	esClient := bootstrap.InitializeElasticSearchSession()

	_, err := esClient.PutMapping().Index(adapters.ClubsIndexName).BodyString(clubsBannerIndex).Do(ctx)

	if err != nil {
		return err
	}

	return nil
}
