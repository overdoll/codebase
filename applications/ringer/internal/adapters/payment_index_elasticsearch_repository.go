package adapters

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
	"time"
)

type PaymentIndexElasticSearchRepository struct {
	session gocqlx.Session
	client  *elastic.Client
}

const clubPaymentsIndex = `
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

type clubPaymentDocument struct {
	Id                       string    `json:"id"`
	Source                   string    `json:"source"`
	Status                   string    `json:"status"`
	SettlementDate           time.Time `json:"settlement_date"`
	SourceAccountId          string    `json:"source_account_id"`
	AccountTransactionId     string    `json:"account_transaction_id"`
	DestinationClubId        string    `json:"destination_club_id"`
	Currency                 string    `json:"currency"`
	BaseAmount               int64     `json:"base_amount"`
	PlatformFeeAmount        int64     `json:"platform_fee_amount"`
	FinalAmount              int64     `json:"final_amount"`
	IsDeduction              bool      `json:"is_deduction"`
	DeductionSourcePaymentId *string   `json:"deduction_source_payment_id"`
	Timestamp                time.Time `json:"timestamp"`
	ClubPayoutIds            []string  `json:"club_payout_ids"`
}

const ClubPaymentsIndexName = "club_payments"

func NewPaymentIndexElasticSearchRepository(client *elastic.Client, session gocqlx.Session) PaymentIndexElasticSearchRepository {
	return PaymentIndexElasticSearchRepository{client: client, session: session}
}

func unmarshalClubPaymentDocument(hit *elastic.SearchHit) (*payment.ClubPayment, error) {

	var doc clubPaymentDocument

	err := json.Unmarshal(hit.Source, &doc)

	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal club payment: %v", err)
	}

	createdTransaction := payment.UnmarshalClubPaymentFromDatabase(
		doc.Id,
		doc.Source,
		doc.Status,
		doc.SourceAccountId,
		doc.AccountTransactionId,
		doc.DestinationClubId,
		doc.Currency,
		doc.BaseAmount,
		doc.PlatformFeeAmount,
		doc.FinalAmount,
		doc.IsDeduction,
		doc.DeductionSourcePaymentId,
		doc.Timestamp,
		doc.SettlementDate,
		doc.ClubPayoutIds,
	)

	createdTransaction.Node = paging.NewNode(hit.Sort)

	return createdTransaction, nil
}

func marshalClubPaymentToDocument(pay *payment.ClubPayment) (*clubPaymentDocument, error) {
	return &clubPaymentDocument{
		Id:                       pay.Id(),
		Source:                   pay.Source().String(),
		Status:                   pay.Status().String(),
		SettlementDate:           pay.SettlementDate(),
		SourceAccountId:          pay.SourceAccountId(),
		AccountTransactionId:     pay.AccountTransactionId(),
		DestinationClubId:        pay.DestinationClubId(),
		Currency:                 pay.Currency().String(),
		BaseAmount:               pay.BaseAmount(),
		PlatformFeeAmount:        pay.PlatformFeeAmount(),
		FinalAmount:              pay.FinalAmount(),
		IsDeduction:              pay.IsDeduction(),
		DeductionSourcePaymentId: pay.DeductionSourcePaymentId(),
		Timestamp:                pay.Timestamp(),
		ClubPayoutIds:            nil,
	}, nil
}

func (r PaymentIndexElasticSearchRepository) SearchClubPayments(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *payment.ClubPaymentsFilters) ([]*payment.ClubPayment, error) {

	builder := r.client.Search().
		Index(ClubPaymentsIndexName)

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
	}

	if err := cursor.BuildElasticsearch(builder, "timestamp", "id", false); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	if filters.ClubId() != nil {
		filterQueries = append(filterQueries, elastic.NewTermQuery("destination_club_id", *filters.ClubId()))
	}

	if filters.PayoutId() != nil {
		filterQueries = append(filterQueries, elastic.NewTermQuery("club_payout_ids", *filters.PayoutId()))
	}

	if filters.Status() != nil {
		filterQueries = append(filterQueries, elastic.NewTermQuery("status", filters.Status().String()))
	}

	if filterQueries != nil {
		query.Filter(filterQueries...)
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed to search club payments: %v", err)
	}

	var pays []*payment.ClubPayment

	for _, hit := range response.Hits.Hits {

		newTransaction, err := unmarshalClubPaymentDocument(hit)

		if err != nil {
			return nil, err
		}

		pays = append(pays, newTransaction)
	}

	return pays, nil
}

func (r PaymentIndexElasticSearchRepository) IndexAllClubPayments(ctx context.Context) error {

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, clubPaymentsTable, func(iter *gocqlx.Iterx) error {

		var pay clubPayment

		for iter.StructScan(&pay) {

			doc := clubPaymentDocument{
				Id:                       pay.Id,
				Source:                   pay.Source,
				Status:                   pay.Status,
				SettlementDate:           pay.SettlementDate,
				SourceAccountId:          pay.SourceAccountId,
				AccountTransactionId:     pay.AccountTransactionId,
				DestinationClubId:        pay.DestinationClubId,
				Currency:                 pay.Currency,
				BaseAmount:               pay.BaseAmount,
				PlatformFeeAmount:        pay.PlatformFeeAmount,
				FinalAmount:              pay.FinalAmount,
				IsDeduction:              pay.IsDeduction,
				DeductionSourcePaymentId: pay.DeductionSourcePaymentId,
				Timestamp:                pay.Timestamp,
				ClubPayoutIds:            nil,
			}

			_, err := r.client.
				Index().
				Index(ClubPaymentsIndexName).
				Id(doc.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return fmt.Errorf("failed to index club payments: %v", err)
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r PaymentIndexElasticSearchRepository) DeleteClubPaymentsIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(ClubPaymentsIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(ClubPaymentsIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(ClubPaymentsIndexName).BodyString(clubPaymentsIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}

func (r PaymentIndexElasticSearchRepository) IndexClubPayment(ctx context.Context, pay *payment.ClubPayment) error {

	pst, err := marshalClubPaymentToDocument(pay)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(ClubPaymentsIndexName).
		Id(pst.Id).
		BodyJson(*pst).
		Do(ctx)

	if err != nil {
		return fmt.Errorf("failed to index club payment: %v", err)
	}

	return nil
}
