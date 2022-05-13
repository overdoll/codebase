package migrations

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/parley/internal/adapters"
	"overdoll/libraries/bootstrap"
)

const postReportIndexProperties = `
{
	"id": {
		"type": "keyword"
	},
	"reporting_account_id": {
		"type": "keyword"
	},
	"post_id": {
		"type": "keyword"
	},
	"rule_id": {
		"type": "keyword"
	},
	"created_at": {
		"type": "date"
	},
}
`

const postReportsIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties":` + postReportIndexProperties + `
	}
}`

func createPostReportsIndex(ctx context.Context, session gocqlx.Session, ev migrate.CallbackEvent, name string) error {

	esClient := bootstrap.InitializeElasticSearchSession()

	_, err := esClient.CreateIndex(adapters.PostReportsIndexName).Index(postReportsIndex).Do(ctx)

	if err != nil {
		return err
	}

	return nil
}
