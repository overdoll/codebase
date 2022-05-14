package migrations

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/hades/internal/adapters"
	"overdoll/libraries/bootstrap"
)

const accountTransactionIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
				"account_id": {
					"type": "keyword"
				},
				"id": {
					"type": "keyword"
				},
				"created_at": {
					"type": "date"
				},
				"transaction_type": {
					"type": "keyword"
				},
				"club_supporter_subscription_id": {
					"type": "keyword"
				},
				"encrypted_payment_method": {
					"type": "keyword"
				},
				"amount": {
					"type": "integer"
				},
				"currency": {
					"type": "keyword"
				},
				"voided_at": {
					"type": "date"
				},
				"void_reason": {
					"type": "keyword"
				},
				"billed_at_date": {
					"type": "date"
				},
				"next_billing_date": {
					"type": "date"
				},
				"ccbill_subscription_id": {
					"type": "keyword"
				},
				"ccbill_transaction_id": {
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
						"amount": {
							"type": "integer"
						},
						"currency": {
							"type": "keyword"
						},
						"reason": {
							"type": "keyword"
						}
					}
				}
		}
	}
}`

func createAccountTransactionsIndex(ctx context.Context, session gocqlx.Session, ev migrate.CallbackEvent, name string) error {

	esClient := bootstrap.InitializeElasticSearchSession()

	_, err := esClient.CreateIndex(adapters.AccountTransactionsIndexName).BodyString(accountTransactionIndex).Do(ctx)

	if err != nil {
		return err
	}

	return nil
}
