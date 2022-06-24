package migrations

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/errors"
	"overdoll/libraries/localization"
)

const clubsIndexProperties = `
{
	"id": {
		"type": "keyword"
	},
	"slug": {
		"type": "keyword"
	},
	"slug_aliases": {
		"type": "keyword"
	},
	"thumbnail_resource": {
		"type": "keyword"
	},
	"name": ` + localization.ESIndex + `
    "members_count": {
		"type": "integer"
	},
    "owner_account_id": {
		"type": "keyword"
	},
    "suspended": {
		"type": "boolean"
	},
    "suspended_until": {
		"type": "date"
	},
    "next_supporter_post_time": {
		"type": "date"
	},
    "has_created_supporter_only_post": {
		"type": "boolean"
	},
    "terminated": {
		"type": "boolean"
	},
    "terminated_by_account_id": {
		"type": "keyword"
	},
	"created_at": {
		"type": "date"
	},
	"updated_at": {
		"type": "date"
	}
}
`

const clubsIndex = `
{
    "settings": { ` + localization.ESSettings + ` },
	"mappings": {
		"dynamic": "strict",
		"properties":` + clubsIndexProperties + `
	}
}`

func createClubsIndex(ctx context.Context, session gocqlx.Session, ev migrate.CallbackEvent, name string) error {

	esClient := bootstrap.InitializeElasticSearchSession()

	_, err := esClient.CreateIndex(adapters.ClubsIndexName).BodyString(clubsIndex).Do(ctx)

	if err != nil {
		return errors.Wrap(err, "failed to create clubs index")
	}

	return nil
}
