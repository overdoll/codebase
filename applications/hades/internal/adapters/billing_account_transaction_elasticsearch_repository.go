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

type accountTransactionEventDocument struct {
	Id        string    `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	Amount    uint64    `json:"amount"`
	Currency  string    `json:"currency"`
	Reason    string    `json:"reason"`
}

type accountTransactionDocument struct {
	AccountId                   string                            `json:"account_id"`
	Id                          string                            `json:"id"`
	CreatedAt                   time.Time                         `json:"created_at"`
	TransactionType             string                            `json:"transaction_type"`
	ClubSupporterSubscriptionId *string                           `json:"club_supporter_subscription_id"`
	EncryptedPaymentMethod      string                            `json:"encrypted_payment_method"`
	Amount                      uint64                            `json:"amount"`
	Currency                    string                            `json:"currency"`
	VoidedAt                    *time.Time                        `json:"voided_at"`
	VoidReason                  *string                           `json:"void_reason"`
	BilledAtDate                time.Time                         `json:"billed_at_date"`
	NextBillingDate             time.Time                         `json:"next_billing_date"`
	CCBillSubscriptionId        *string                           `json:"ccbill_subscription_id"`
	CCBillTransactionId         *string                           `json:"ccbill_transaction_id"`
	Events                      []accountTransactionEventDocument `json:"events"`
}

const AccountTransactionsIndexName = "account_transactions"

var AccountTransactionsReaderIndex = cache.ReadAlias(CachePrefix, AccountTransactionsIndexName)
var accountTransactionsWriterIndex = cache.WriteAlias(CachePrefix, AccountTransactionsIndexName)

func unmarshalAccountTransactionDocument(hit *elastic.SearchHit) (*billing.AccountTransaction, error) {

	var doc accountTransactionDocument

	err := json.Unmarshal(hit.Source, &doc)

	if err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal account transaction")
	}

	decrypted, err := decryptPaymentMethod(doc.EncryptedPaymentMethod)

	if err != nil {
		return nil, err
	}

	var events []*billing.AccountTransactionEvent

	for _, e := range doc.Events {
		events = append(events, billing.UnmarshalAccountTransactionEventFromDatabase(
			e.Id,
			e.CreatedAt,
			e.Amount,
			e.Currency,
			e.Reason,
		))
	}

	createdTransaction := billing.UnmarshalAccountTransactionFromDatabase(
		doc.AccountId,
		doc.Id,
		doc.CreatedAt,
		doc.TransactionType,
		decrypted,
		doc.Amount,
		doc.Currency,
		doc.BilledAtDate,
		doc.NextBillingDate,
		doc.CCBillSubscriptionId,
		doc.CCBillTransactionId,
		doc.ClubSupporterSubscriptionId,
		doc.VoidedAt,
		doc.VoidReason,
		events,
	)

	createdTransaction.Node = paging.NewNode(hit.Sort)

	return createdTransaction, nil
}

func marshalAccountTransactionToDocument(transaction *billing.AccountTransaction) (*accountTransactionDocument, error) {
	var events []accountTransactionEventDocument

	for _, e := range transaction.Events() {
		events = append(events, accountTransactionEventDocument{
			Id:        e.Id(),
			CreatedAt: e.CreatedAt(),
			Amount:    e.Amount(),
			Currency:  e.Currency().String(),
			Reason:    e.Reason(),
		})
	}

	encrypted, err := encryptPaymentMethod(transaction.PaymentMethod())

	if err != nil {
		return nil, err
	}

	return &accountTransactionDocument{
		AccountId:                   transaction.AccountId(),
		Id:                          transaction.Id(),
		CreatedAt:                   transaction.CreatedAt(),
		TransactionType:             transaction.Type().String(),
		ClubSupporterSubscriptionId: transaction.ClubSupporterSubscriptionId(),
		EncryptedPaymentMethod:      encrypted,
		Amount:                      transaction.Amount(),
		Currency:                    transaction.Currency().String(),
		VoidedAt:                    transaction.VoidedAt(),
		VoidReason:                  transaction.VoidReason(),
		BilledAtDate:                transaction.BilledAtDate(),
		NextBillingDate:             transaction.NextBillingDate(),
		CCBillSubscriptionId:        transaction.CCBillSubscriptionId(),
		CCBillTransactionId:         transaction.CCBillTransactionId(),
		Events:                      events,
	}, nil
}

func (r BillingCassandraElasticsearchRepository) GetAccountTransactionsCount(ctx context.Context, requester *principal.Principal, accountId string, states []billing.Transaction) (*int64, error) {

	if err := billing.CanViewAccountTransactionsCount(requester, accountId); err != nil {
		return nil, err
	}

	builder := r.client.Count().
		Index(AccountTransactionsReaderIndex)

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	filterQueries = append(filterQueries, elastic.NewTermQuery("account_id", accountId))

	var statuses []string
	for _, status := range states {
		statuses = append(statuses, status.String())
	}
	filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("transaction_type", statuses...))

	query.Filter(filterQueries...)

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to get account transactions count")
	}

	return &response, nil
}

func (r BillingCassandraElasticsearchRepository) SearchAccountTransactions(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *billing.AccountTransactionsFilters) ([]*billing.AccountTransaction, error) {

	var subscription *billing.AccountClubSupporterSubscription
	var err error

	if filters.AccountClubSupporterSubscriptionId() != nil {
		subscription, err = r.GetAccountClubSupporterSubscriptionById(ctx, requester, *filters.AccountClubSupporterSubscriptionId())
		if err != nil {
			return nil, err
		}
	}

	if err := billing.CanViewAccountTransactions(requester, filters, subscription); err != nil {
		return nil, err
	}

	builder := r.client.Search().
		Index(AccountTransactionsReaderIndex)

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

	if filters.AccountClubSupporterSubscriptionId() != nil {
		filterQueries = append(filterQueries, elastic.NewTermQuery("club_supporter_subscription_id", *filters.AccountClubSupporterSubscriptionId()))
	}

	if filters.TransactionType() != nil {
		filterQueries = append(filterQueries, elastic.NewTermQuery("transaction_type", filters.TransactionType().String()))
	}

	if filterQueries != nil {
		query.Filter(filterQueries...)
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search account transactions")
	}

	var transactions []*billing.AccountTransaction

	for _, hit := range response.Hits.Hits {

		newTransaction, err := unmarshalAccountTransactionDocument(hit)

		if err != nil {
			return nil, err
		}

		transactions = append(transactions, newTransaction)
	}

	return transactions, nil
}

func (r BillingCassandraElasticsearchRepository) IndexAllAccountTransactions(ctx context.Context) error {

	scanner := database.NewScan(r.session,
		database.ScanConfig{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, accountTransactionsTable, func(iter *gocqlx.Iterx) error {

		var transaction accountTransactions

		for iter.StructScan(&transaction) {

			unmarshalled, err := unmarshalAccountTransactionFromDatabase(&transaction)

			if err != nil {
				return err
			}

			doc, err := marshalAccountTransactionToDocument(unmarshalled)

			if err != nil {
				return err
			}

			_, err = r.client.
				Index().
				Index(accountTransactionsWriterIndex).
				Id(doc.Id).
				OpType("create").
				BodyJson(doc).
				Do(ctx)

			e, ok := err.(*elastic.Error)
			if ok && e.Details.Type == "version_conflict_engine_exception" {
				zap.S().Infof("skipping document [%s] due to conflict", doc.Id)
			} else {
				return errors.Wrap(support.ParseElasticError(err), "failed to index account transaction")
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r BillingCassandraElasticsearchRepository) indexAccountTransaction(ctx context.Context, transaction *billing.AccountTransaction) error {

	pst, err := marshalAccountTransactionToDocument(transaction)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(accountTransactionsWriterIndex).
		Id(pst.Id).
		BodyJson(*pst).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to index account transaction")
	}

	return nil
}
