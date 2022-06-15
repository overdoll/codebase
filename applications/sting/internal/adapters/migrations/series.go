package migrations

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/localization"
)

const seriesIndexProperties = `
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
	"thumbnail_resource": {
 		"type": "object",
		"dynamic": true
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

const seriesIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": ` + seriesIndexProperties + `
	}
}`

func createSeriesIndex(ctx context.Context, session gocqlx.Session, ev migrate.CallbackEvent, name string) error {

	esClient := bootstrap.InitializeElasticSearchSession()

	_, err := esClient.CreateIndex(adapters.SeriesIndexName).BodyString(seriesIndex).Do(ctx)

	if err != nil {
		return err
	}

	return nil
}
