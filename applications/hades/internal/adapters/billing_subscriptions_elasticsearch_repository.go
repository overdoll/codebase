package adapters

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
	"time"
)

type accountClubSupporterSubscriptionDocument struct {
	AccountId       string    `json:"account_id"`
	ClubId          string    `json:"club_id"`
	Status          string    `json:"status"`
	SupporterSince  time.Time `json:"supporter_since"`
	LastBillingDate time.Time `json:"last_billing_date"`
	NextBillingDate time.Time `json:"next_billing_date"`
	BillingAmount   uint64    `json:"billing_amount"`
	BillingCurrency string    `json:"billing_currency"`

	CreatedAt   time.Time  `json:"created_at"`
	CancelledAt *time.Time `json:"cancelled_at"`
	ExpiredAt   *time.Time `json:"expired_at"`

	FailedAt                    *time.Time `json:"failed_at"`
	CCBillErrorText             *string    `json:"ccbill_error_text"`
	CCBillErrorCode             *string    `json:"ccbill_error_code"`
	BillingFailureNextRetryDate *time.Time `json:"billing_failure_next_retry_date"`

	Id                     string    `json:"id"`
	EncryptedPaymentMethod string    `json:"encrypted_payment_method"`
	CCBillSubscriptionId   *string   `json:"ccbill_subscription_id"`
	UpdatedAt              time.Time `json:"updated_at"`
	CancellationReasonId   *string   `json:"cancellation_reason_id"`
}

const subscriptionsIndex = `
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

const SubscriptionsIndexName = "club_supporter_subscriptions"

func unmarshalAccountClubSupporterSubscriptionDocument(hit *elastic.SearchHit) (*billing.AccountClubSupporterSubscription, error) {

	var doc accountClubSupporterSubscriptionDocument

	err := json.Unmarshal(hit.Source, &doc)

	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal account club supporter subscription: %v", err)
	}

	decrypted, err := decryptPaymentMethod(doc.EncryptedPaymentMethod)

	if err != nil {
		return nil, err
	}

	createdSubscription := billing.UnmarshalAccountClubSupporterSubscriptionFromDatabase(
		doc.Id,
		doc.AccountId,
		doc.ClubId,
		doc.Status,
		doc.SupporterSince,
		doc.LastBillingDate,
		doc.NextBillingDate,
		doc.BillingAmount,
		doc.BillingCurrency,
		decrypted,
		doc.CCBillSubscriptionId,
		doc.CancelledAt,
		doc.CreatedAt,
		doc.UpdatedAt,
		doc.CancellationReasonId,
		doc.ExpiredAt,
		doc.FailedAt,
		doc.CCBillErrorText,
		doc.CCBillErrorCode,
		doc.BillingFailureNextRetryDate,
	)

	createdSubscription.Node = paging.NewNode(hit.Sort)

	return createdSubscription, nil
}

func marshalAccountClubSupporterSubscriptionToDocument(subscription *billing.AccountClubSupporterSubscription) (*accountClubSupporterSubscriptionDocument, error) {

	encrypted, err := encryptPaymentMethod(subscription.PaymentMethod())

	if err != nil {
		return nil, err
	}

	return &accountClubSupporterSubscriptionDocument{
		AccountId:                   subscription.AccountId(),
		ClubId:                      subscription.ClubId(),
		Status:                      subscription.Status().String(),
		SupporterSince:              subscription.SupporterSince(),
		LastBillingDate:             subscription.LastBillingDate(),
		NextBillingDate:             subscription.NextBillingDate(),
		BillingAmount:               subscription.BillingAmount(),
		BillingCurrency:             subscription.BillingCurrency().String(),
		CreatedAt:                   subscription.CreatedAt(),
		CancelledAt:                 subscription.CancelledAt(),
		ExpiredAt:                   subscription.ExpiredAt(),
		FailedAt:                    subscription.FailedAt(),
		CCBillErrorText:             subscription.CCBillErrorText(),
		CCBillErrorCode:             subscription.CCBillErrorCode(),
		BillingFailureNextRetryDate: subscription.BillingFailureNextRetryDate(),
		Id:                          subscription.Id(),
		EncryptedPaymentMethod:      encrypted,
		CCBillSubscriptionId:        subscription.CCBillSubscriptionId(),
		UpdatedAt:                   subscription.UpdatedAt(),
		CancellationReasonId:        subscription.CancellationReasonId(),
	}, nil
}

func (r BillingCassandraElasticsearchRepository) SearchAccountClubSupporterSubscriptions(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *billing.AccountClubSupporterSubscriptionFilters) ([]*billing.AccountClubSupporterSubscription, error) {

	if err := billing.CanViewAccountClubSupporterSubscription(requester, filters.AccountId(), filters.ClubId()); err != nil {
		return nil, err
	}

	builder := r.client.Search().
		Index(AccountTransactionsIndexName)

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
	}

	if err := cursor.BuildElasticsearch(builder, "created_at", "id", false); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	if filters.AccountId() != nil {
		filterQueries = append(filterQueries, elastic.NewTermQuery("account_id", *filters.AccountId()))
	}

	if filters.ClubId() != nil {
		filterQueries = append(filterQueries, elastic.NewTermQuery("club_id", *filters.ClubId()))
	}

	var status []string

	for _, s := range filters.Status() {
		status = append(status, s.String())
	}

	if len(status) > 0 {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("status", status...))
	}

	if filterQueries != nil {
		query.Filter(filterQueries...)
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed to search account transactions: %v", err)
	}

	var subscriptions []*billing.AccountClubSupporterSubscription

	for _, hit := range response.Hits.Hits {

		newSubscription, err := unmarshalAccountClubSupporterSubscriptionDocument(hit)

		if err != nil {
			return nil, err
		}

		subscriptions = append(subscriptions, newSubscription)
	}

	return subscriptions, nil
}

func (r BillingCassandraElasticsearchRepository) indexAllAccountClubSupporterSubscriptions(ctx context.Context) error {

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, accountClubSupporterSubscriptionsTable, func(iter *gocqlx.Iterx) error {

		var subscription accountClubSupporterSubscription

		for iter.StructScan(&subscription) {

			doc := accountClubSupporterSubscriptionDocument{
				AccountId:                   subscription.AccountId,
				ClubId:                      subscription.ClubId,
				Status:                      subscription.Status,
				SupporterSince:              subscription.SupporterSince,
				LastBillingDate:             subscription.LastBillingDate,
				NextBillingDate:             subscription.NextBillingDate,
				BillingAmount:               subscription.BillingAmount,
				BillingCurrency:             subscription.BillingCurrency,
				CreatedAt:                   subscription.CreatedAt,
				CancelledAt:                 subscription.CancelledAt,
				ExpiredAt:                   subscription.ExpiredAt,
				FailedAt:                    subscription.FailedAt,
				CCBillErrorText:             subscription.CCBillErrorText,
				CCBillErrorCode:             subscription.CCBillErrorCode,
				BillingFailureNextRetryDate: subscription.BillingFailureNextRetryDate,
				Id:                          subscription.Id,
				EncryptedPaymentMethod:      subscription.EncryptedPaymentMethod,
				CCBillSubscriptionId:        subscription.CCBillSubscriptionId,
				UpdatedAt:                   subscription.UpdatedAt,
				CancellationReasonId:        subscription.CancellationReasonId,
			}

			_, err := r.client.
				Index().
				Index(SubscriptionsIndexName).
				Id(doc.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return fmt.Errorf("failed to index account club supporter subscription: %v", err)
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r BillingCassandraElasticsearchRepository) deleteAccountClubSupporterSubscriptionsIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(SubscriptionsIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(SubscriptionsIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(SubscriptionsIndexName).BodyString(subscriptionsIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}

func (r BillingCassandraElasticsearchRepository) DeleteAndRecreateAccountClubSupporterSubscriptionsIndex(ctx context.Context) error {

	if err := r.deleteAccountClubSupporterSubscriptionsIndex(ctx); err != nil {
		return err
	}

	return r.indexAllAccountClubSupporterSubscriptions(ctx)
}

func (r BillingCassandraElasticsearchRepository) indexAccountClubSupporterSubscription(ctx context.Context, subscription *billing.AccountClubSupporterSubscription) error {

	pst, err := marshalAccountClubSupporterSubscriptionToDocument(subscription)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(SubscriptionsIndexName).
		Id(pst.Id).
		BodyJson(*pst).
		Do(ctx)

	if err != nil {
		return fmt.Errorf("failed to index account club supporter subscription: %v", err)
	}

	return nil
}
