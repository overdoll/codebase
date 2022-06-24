package migrations

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/localization"
)

const audienceIndexProperties = `
{
	"id": {
		"type": "keyword"
	},
	"slug": {
		"type": "keyword"
	},
	"thumbnail_resource": {
		"type": "keyword"
	},
	"standard": {
		"type": "integer"
	},
	"total_likes": {
		"type": "integer"
	},
	"total_posts": {
		"type": "integer"
	},
	"title": ` + localization.ESIndex + `
	"created_at": {
		"type": "date"
	},
	"updated_at": {
		"type": "date"
	}
}
`

const audienceIndex = `
{
    "settings": { ` + localization.ESSettings + ` },
	"mappings": {
		"dynamic": "strict",
		"properties": ` + audienceIndexProperties + `
	}
}`

func createAudienceIndex(ctx context.Context, session gocqlx.Session, ev migrate.CallbackEvent, name string) error {

	esClient := bootstrap.InitializeElasticSearchSession()

	_, err := esClient.CreateIndex(adapters.AudienceIndexName).BodyString(audienceIndex).Do(ctx)

	if err != nil {
		return err
	}

	return nil
}
