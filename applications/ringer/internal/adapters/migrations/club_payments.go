package migrations

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/ringer/internal/adapters"
	"overdoll/libraries/bootstrap"
)

const clubPaymentsIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
				"id": {
					"type": "keyword"
				},
				"source": {
					"type": "keyword"
				},
				"status": {
					"type": "keyword"
				},
				"settlement_date": {
					"type": "date"
				},
				"source_account_id": {
					"type": "keyword"
				},
				"destination_club_id": {
					"type": "keyword"
				},
				"account_transaction_id": {
					"type": "keyword"
				},
				"currency": {
					"type": "keyword"
				},
				"base_amount": {
					"type": "integer"
				},
				"platform_fee_amount": {
					"type": "integer"
				},
				"final_amount": {
					"type": "integer"
				},
				"is_deduction": {
					"type": "boolean"
				},
				"deduction_source_payment_id": {
					"type": "keyword"
				},
				"club_payout_ids": {
					"type": "keyword"
				},
				"created_at": {
					"type": "date"
				}
		}
	}
}`

func createClubPaymentsIndex(ctx context.Context, session gocqlx.Session, ev migrate.CallbackEvent, name string) error {

	esClient := bootstrap.InitializeElasticSearchSession()

	_, err := esClient.CreateIndex(adapters.ClubPaymentsIndexName).Index(clubPaymentsIndex).Do(ctx)

	if err != nil {
		return err
	}

	return nil
}
