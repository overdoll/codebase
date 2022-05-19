package adapters

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"go.uber.org/zap"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
	"time"
)

type clubPaymentDocument struct {
	Id                       string    `json:"id"`
	Source                   string    `json:"source"`
	Status                   string    `json:"status"`
	SettlementDate           time.Time `json:"settlement_date"`
	SourceAccountId          string    `json:"source_account_id"`
	AccountTransactionId     string    `json:"account_transaction_id"`
	DestinationClubId        string    `json:"destination_club_id"`
	Currency                 string    `json:"currency"`
	BaseAmount               uint64    `json:"base_amount"`
	PlatformFeeAmount        uint64    `json:"platform_fee_amount"`
	FinalAmount              uint64    `json:"final_amount"`
	IsDeduction              bool      `json:"is_deduction"`
	DeductionSourcePaymentId *string   `json:"deduction_source_payment_id"`
	CreatedAt                time.Time `json:"created_at"`
	ClubPayoutIds            []string  `json:"club_payout_ids"`
}

const ClubPaymentsIndexName = "club_payments"

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
		doc.CreatedAt,
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
		CreatedAt:                pay.CreatedAt(),
		ClubPayoutIds:            pay.ClubPayoutIds(),
	}, nil
}

func (r PaymentCassandraElasticsearchRepository) SearchClubPayments(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *payment.ClubPaymentsFilters) ([]*payment.ClubPayment, error) {

	builder := r.client.Search().
		Index(ClubPaymentsIndexName)

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
	}

	// general search
	if filters.ClubId() == nil && filters.PayoutId() == nil {
		if !requester.IsStaff() {
			return nil, principal.ErrNotAuthorized
		}
	}

	if filters.ClubId() != nil {
		if err := canViewSensitive(ctx, requester, *filters.ClubId()); err != nil {
			return nil, err
		}
	}

	if err := cursor.BuildElasticsearch(builder, "created_at", "id", false); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	if filters.ClubId() != nil {
		filterQueries = append(filterQueries, elastic.NewTermQuery("destination_club_id", *filters.ClubId()))
	}

	if filters.PayoutId() != nil {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("club_payout_ids", *filters.PayoutId()))
	}

	var statuses []string
	for _, status := range filters.Status() {
		statuses = append(statuses, status.String())
	}

	if len(statuses) > 0 {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("status", statuses...))
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

func (r PaymentCassandraElasticsearchRepository) updateIndexPaymentPayoutId(ctx context.Context, payoutId string, paymentIds []string) error {
	_, err := r.client.UpdateByQuery(ClubPaymentsIndexName).
		Query(elastic.NewTermsQueryFromStrings("id", paymentIds...)).
		Script(elastic.NewScript(`

		if (ctx._source.club_payout_ids == null) {
			ctx._source.club_payout_ids = new ArrayList();
		}

		if (!ctx._source.club_payout_ids.contains(params.payoutId)) { 
			ctx._source.club_payout_ids.add(params.payoutId) 
		} 

	`).Param("payoutId", payoutId).Lang("painless")).
		Do(ctx)

	if err != nil {
		e, _ := err.(*elastic.Error)
		zap.S().Errorw("failed to update index append club payments payout id: elastic failed", zap.Int("status", e.Status), zap.Any("error", e.Details))
		return fmt.Errorf("failed to update index append club payments payout id: %v", err)
	}

	return nil
}

func (r PaymentCassandraElasticsearchRepository) IndexAllClubPayments(ctx context.Context) error {

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
				CreatedAt:                pay.CreatedAt,
				ClubPayoutIds:            pay.ClubPayoutIds,
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

func (r PaymentCassandraElasticsearchRepository) indexClubPayment(ctx context.Context, pay *payment.ClubPayment) error {

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

func (r PaymentCassandraElasticsearchRepository) updateIndexClubPaymentsCompleted(ctx context.Context, paymentIds []string) error {

	_, err := r.client.UpdateByQuery(ClubPaymentsIndexName).
		Query(elastic.NewTermsQueryFromStrings("id", paymentIds...)).
		Script(elastic.NewScript("ctx._source.status= params.updatedStatus").Param("updatedStatus", payment.Complete.String()).Lang("painless")).
		Do(ctx)

	if err != nil {
		return fmt.Errorf("failed to update index club payments completed: %v", err)
	}

	return nil
}
