package migrations

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/localization"
)

const categoryIndexProperties = `
{
	"id": {
		"type": "keyword"
	},
	"slug": {
		"type": "keyword"
	},
	"thumbnail_resource_id": {
		"type": "keyword"
	},
	"total_likes": {
		"type": "integer"
	},
	"total_posts": {
		"type": "integer"
	},
	"title":  ` + localization.ESIndex + `
	"created_at": {
		"type": "date"
	}
}
`

const categoryIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": ` + categoryIndexProperties + `
	}
}`

func createCategoryIndex(ctx context.Context, session gocqlx.Session, ev migrate.CallbackEvent, name string) error {

	esClient := bootstrap.InitializeElasticSearchSession()

	_, err := esClient.CreateIndex(adapters.CategoryIndexName).BodyString(categoryIndex).Do(ctx)

	if err != nil {
		return err
	}

	return nil
}
