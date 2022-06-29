package adapters

import (
	"context"
	"encoding/json"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"go.uber.org/zap"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/cache"
	"overdoll/libraries/database"
	"overdoll/libraries/errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
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

const AccountClubSupporterSubscriptionsIndexName = "account_club_supporter_subscriptions"

var AccountClubSupporterSubscriptionsReaderIndex = cache.ReadAlias(CachePrefix, AccountClubSupporterSubscriptionsIndexName)
var accountClubSupporterSubscriptionsWriterIndex = cache.WriteAlias(CachePrefix, AccountClubSupporterSubscriptionsIndexName)

func unmarshalAccountClubSupporterSubscriptionDocument(hit *elastic.SearchHit) (*billing.AccountClubSupporterSubscription, error) {

	var doc accountClubSupporterSubscriptionDocument

	err := json.Unmarshal(hit.Source, &doc)

	if err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal account club supporter subscription")
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

func (r BillingCassandraElasticsearchRepository) GetAccountActiveClubSupporterSubscriptionsOperator(ctx context.Context, accountId string) ([]*billing.AccountClubSupporterSubscription, error) {

	builder := r.client.Search().
		Index(AccountClubSupporterSubscriptionsReaderIndex)

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	filterQueries = append(filterQueries, elastic.NewTermQuery("account_id", accountId))
	filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("status", billing.Active.String()))
	query.Filter(filterQueries...)

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search account active club supporter subscriptions")
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

func (r BillingCassandraElasticsearchRepository) SearchAccountClubSupporterSubscriptions(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *billing.AccountClubSupporterSubscriptionFilters) ([]*billing.AccountClubSupporterSubscription, error) {

	if err := billing.CanViewAccountClubSupporterSubscription(requester, filters.AccountId(), filters.ClubId()); err != nil {
		return nil, err
	}

	builder := r.client.Search().
		Index(AccountClubSupporterSubscriptionsReaderIndex)

	if cursor == nil {
		return nil, paging.ErrCursorNotPresent
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
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search account club supporter subscriptions")
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

func (r BillingCassandraElasticsearchRepository) IndexAllAccountClubSupporterSubscriptions(ctx context.Context) error {

	scanner := database.New(r.session,
		database.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, accountClubSupporterSubscriptionsTable, func(iter *gocqlx.Iterx) error {

		var subscription accountClubSupporterSubscription

		for iter.StructScan(&subscription) {

			unmarshalled, err := unmarshalAccountClubSubscriptionFromDatabase(&subscription)

			if err != nil {
				return err
			}

			doc, err := marshalAccountClubSupporterSubscriptionToDocument(unmarshalled)

			if err != nil {
				return err
			}

			_, err = r.client.
				Index().
				Index(accountClubSupporterSubscriptionsWriterIndex).
				Id(doc.Id).
				BodyJson(doc).
				OpType("create").
				Do(ctx)

			e, ok := err.(*elastic.Error)
			if ok && e.Details.Type == "version_conflict_engine_exception" {
				zap.S().Infof("skipping document [%s] due to conflict", doc.Id)
			} else {
				return errors.Wrap(support.ParseElasticError(err), "failed to index account club supporter subscription")
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r BillingCassandraElasticsearchRepository) indexAccountClubSupporterSubscription(ctx context.Context, subscription *billing.AccountClubSupporterSubscription) error {

	pst, err := marshalAccountClubSupporterSubscriptionToDocument(subscription)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(accountClubSupporterSubscriptionsWriterIndex).
		Id(pst.Id).
		BodyJson(*pst).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to index account club supporter subscription")
	}

	return nil
}
