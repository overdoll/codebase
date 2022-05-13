package migrations

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/ringer/internal/adapters"
	"overdoll/libraries/bootstrap"
)

const clubPayoutsIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
				"id": {
					"type": "keyword"
				},
				"status": {
					"type": "keyword"
				},
				"deposit_date": {
					"type": "date"
				},
				"club_id": {
					"type": "keyword"
				},
				"currency": {
					"type": "keyword"
				},
				"amount": {
					"type": "integer"
				},
				"payout_account_id": {
					"type": "keyword"
				},
				"deposit_request_id": {
					"type": "keyword"
				},
				"created_at": {
					"type": "date"
				},
				"temporal_workflow_id": {
					"type": "keyword"
				},
				"events": {
					"type": "nested",
					"properties":{
						"id": {
							"type": "keyword"
						},
						"created_at": {
							"type": "date"
						},
						"error": {
							"type": "keyword"
						}
					}
				}
		}
	}
}`

func createClubPayoutsIndex(ctx context.Context, session gocqlx.Session, ev migrate.CallbackEvent, name string) error {

	esClient := bootstrap.InitializeElasticSearchSession()

	_, err := esClient.CreateIndex(adapters.ClubPayoutsIndexName).Index(clubPayoutsIndex).Do(ctx)

	if err != nil {
		return err
	}

	return nil
}
