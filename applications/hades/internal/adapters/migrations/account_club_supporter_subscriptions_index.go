package migrations

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/hades/internal/adapters"
	"overdoll/libraries/bootstrap"
)

const subscriptionsIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
				"account_id": {
					"type": "keyword"
				},
				"club_id": {
					"type": "keyword"
				},
				"id": {
					"type": "keyword"
				},
				"created_at": {
					"type": "date"
				},
				"cancelled_at": {
					"type": "date"
				},
				"expired_at": {
					"type": "date"
				},
				"updated_at": {
					"type": "date"
				},
				"failed_at": {
					"type": "date"
				},
				"ccbill_error_text": {
					"type": "keyword"
				},
				"ccbill_error_code": {
					"type": "keyword"
				},
				"billing_failure_next_retry_date": {
					"type": "date"
				},
				"status": {
					"type": "keyword"
				},
				"supporter_since": {
					"type": "date"
				},
				"last_billing_date": {
					"type": "date"
				},
				"next_billing_date": {
					"type": "date"
				},
				"billing_amount": {
					"type": "integer"
				},
				"billing_currency": {
					"type": "keyword"
				},
				"encrypted_payment_method": {
					"type": "keyword"
				},
				"ccbill_subscription_id": {
					"type": "keyword"
				},
				"cancellation_reason_id": {
					"type": "keyword"
				}
		}
	}
}`

func createAccountClubSupporterSubscriptionsIndex(ctx context.Context, session gocqlx.Session, ev migrate.CallbackEvent, name string) error {

	esClient := bootstrap.InitializeElasticSearchSession()

	_, err := esClient.CreateIndex(adapters.SubscriptionsIndexName).BodyString(subscriptionsIndex).Do(ctx)

	if err != nil {
		return err
	}

	return nil
}
