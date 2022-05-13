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

type accountTransactionEventDocument struct {
	Id        string    `json:"id"`
	Timestamp time.Time `json:"timestamp"`
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

func unmarshalAccountTransactionDocument(hit *elastic.SearchHit) (*billing.AccountTransaction, error) {

	var doc accountTransactionDocument

	err := json.Unmarshal(hit.Source, &doc)

	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal account transaction: %v", err)
	}

	decrypted, err := decryptPaymentMethod(doc.EncryptedPaymentMethod)

	if err != nil {
		return nil, err
	}

	var events []*billing.AccountTransactionEvent

	for _, e := range doc.Events {
		events = append(events, billing.UnmarshalAccountTransactionEventFromDatabase(
			e.Id,
			e.Timestamp,
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
			Timestamp: e.CreatedAt(),
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

	builder := r.client.Count().
		Index(AccountTransactionsIndexName)

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
		return nil, fmt.Errorf("failed to get transactions count: %v", err)
	}

	return &response, nil
}

func (r BillingCassandraElasticsearchRepository) SearchAccountTransactions(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *billing.AccountTransactionHistoryFilters) ([]*billing.AccountTransaction, error) {

	builder := r.client.Search().
		Index(AccountTransactionsIndexName)

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
	}

	if err := cursor.BuildElasticsearch(builder, "timestamp", "id", false); err != nil {
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
		return nil, fmt.Errorf("failed to search account transactions: %v", err)
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

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, accountTransactionsTable, func(iter *gocqlx.Iterx) error {

		var transaction accountTransactions

		for iter.StructScan(&transaction) {

			var events []accountTransactionEventDocument

			for _, e := range transaction.Events {

				var unmarshal accountTransactionEvent

				if err := json.Unmarshal([]byte(e), &unmarshal); err != nil {
					return err
				}

				events = append(events, accountTransactionEventDocument{
					Id:        unmarshal.Id,
					Timestamp: unmarshal.CreatedAt,
					Amount:    unmarshal.Amount,
					Currency:  unmarshal.Currency,
					Reason:    unmarshal.Reason,
				})
			}

			doc := accountTransactionDocument{
				AccountId:                   transaction.AccountId,
				Id:                          transaction.Id,
				CreatedAt:                   transaction.CreatedAt,
				TransactionType:             transaction.TransactionType,
				ClubSupporterSubscriptionId: transaction.ClubSupporterSubscriptionId,
				EncryptedPaymentMethod:      transaction.EncryptedPaymentMethod,
				Amount:                      transaction.Amount,
				Currency:                    transaction.Currency,
				VoidedAt:                    transaction.VoidedAt,
				VoidReason:                  transaction.VoidReason,
				BilledAtDate:                transaction.BilledAtDate,
				NextBillingDate:             transaction.NextBillingDate,
				CCBillSubscriptionId:        transaction.CCBillSubscriptionId,
				CCBillTransactionId:         transaction.CCBillTransactionId,
				Events:                      events,
			}

			_, err := r.client.
				Index().
				Index(AccountTransactionsIndexName).
				Id(doc.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return fmt.Errorf("failed to index account transaction: %v", err)
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
		Index(AccountTransactionsIndexName).
		Id(pst.Id).
		BodyJson(*pst).
		Do(ctx)

	if err != nil {
		return fmt.Errorf("failed to index account transaction: %v", err)
	}

	return nil
}
