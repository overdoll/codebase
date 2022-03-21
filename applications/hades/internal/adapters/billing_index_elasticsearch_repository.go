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

type BillingIndexElasticSearchRepository struct {
	session gocqlx.Session
	client  *elastic.Client
}

type accountTransactionEventDocument struct {
	Id        string    `json:"id"`
	Timestamp time.Time `json:"timestamp"`
	Amount    int64     `json:"amount"`
	Currency  string    `json:"currency"`
	Reason    string    `json:"reason"`
}

type accountTransactionDocument struct {
	AccountId                   string                            `json:"account_id"`
	Id                          string                            `json:"id"`
	Timestamp                   time.Time                         `json:"timestamp"`
	TransactionType             string                            `json:"transaction_type"`
	ClubSupporterSubscriptionId *string                           `json:"club_supporter_subscription_id"`
	EncryptedPaymentMethod      string                            `json:"encrypted_payment_method"`
	Amount                      int64                             `json:"amount"`
	Currency                    string                            `json:"currency"`
	VoidedAt                    *time.Time                        `json:"voided_at"`
	VoidReason                  *string                           `json:"void_reason"`
	BilledAtDate                time.Time                         `json:"billed_at_date"`
	NextBillingDate             time.Time                         `json:"next_billing_date"`
	CCBillSubscriptionId        *string                           `json:"ccbill_subscription_id"`
	CCBillTransactionId         *string                           `json:"ccbill_transaction_id"`
	Events                      []accountTransactionEventDocument `json:"events"`
}

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
				"timestamp": {
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
						"timestamp": {
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

const AccountTransactionsIndexName = "account_transactions"

func NewBillingIndexElasticSearchRepository(client *elastic.Client, session gocqlx.Session) BillingIndexElasticSearchRepository {
	return BillingIndexElasticSearchRepository{client: client, session: session}
}

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
		doc.Timestamp,
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
			Timestamp: e.Timestamp(),
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
		Timestamp:                   transaction.Timestamp(),
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

func (r BillingIndexElasticSearchRepository) GetAccountTransactionsCount(ctx context.Context, requester *principal.Principal, accountId string, states []billing.Transaction) (*int64, error) {

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

func (r BillingIndexElasticSearchRepository) SearchAccountTransactions(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *billing.AccountTransactionHistoryFilters) ([]*billing.AccountTransaction, error) {

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

func (r BillingIndexElasticSearchRepository) IndexAllAccountTransactions(ctx context.Context) error {

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
					Timestamp: unmarshal.Timestamp,
					Amount:    unmarshal.Amount,
					Currency:  unmarshal.Currency,
					Reason:    unmarshal.Reason,
				})
			}

			doc := accountTransactionDocument{
				AccountId:                   transaction.AccountId,
				Id:                          transaction.Id,
				Timestamp:                   transaction.Timestamp,
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

func (r BillingIndexElasticSearchRepository) DeleteAccountTransactionsIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(AccountTransactionsIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(AccountTransactionsIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(AccountTransactionsIndexName).BodyString(accountTransactionIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}

func (r BillingIndexElasticSearchRepository) IndexAccountTransaction(ctx context.Context, transaction *billing.AccountTransaction) error {

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