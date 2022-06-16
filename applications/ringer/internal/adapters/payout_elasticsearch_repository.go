package adapters

import (
	"context"
	"encoding/json"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
	"overdoll/libraries/support"
	"time"
)

type clubPayoutEventDocument struct {
	Id        string    `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	Error     string    `json:"error"`
}

type clubPayoutDocument struct {
	Id                 string                    `json:"id"`
	Status             string                    `json:"status"`
	DepositDate        time.Time                 `json:"deposit_date"`
	ClubId             string                    `json:"club_id"`
	Currency           string                    `json:"currency"`
	Amount             uint64                    `json:"amount"`
	CoverFeeAmount     uint64                    `json:"cover_fee_amount"`
	TotalAmount        uint64                    `json:"total_amount"`
	PayoutAccountId    string                    `json:"payout_account_id"`
	DepositRequestId   string                    `json:"deposit_request_id"`
	CreatedAt          time.Time                 `json:"created_at"`
	Events             []clubPayoutEventDocument `json:"events"`
	TemporalWorkflowId string                    `json:"temporal_workflow_id"`
}

const ClubPayoutsIndexName = "ringer.club_payouts"

func unmarshalClubPayoutDocument(hit *elastic.SearchHit) (*payout.ClubPayout, error) {

	var doc clubPayoutDocument

	if err := json.Unmarshal(hit.Source, &doc); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal club payout")
	}

	var events []*payout.ClubPayoutEvent

	for _, evt := range doc.Events {
		events = append(events, payout.UnmarshalClubPayoutEventFromDatabase(
			evt.Id,
			evt.CreatedAt,
			evt.Error,
		))
	}

	createdTransaction := payout.UnmarshalClubPayoutFromDatabase(
		doc.Id,
		doc.Status,
		doc.ClubId,
		doc.Currency,
		doc.Amount,
		doc.CoverFeeAmount,
		doc.TotalAmount,
		doc.DepositDate,
		doc.PayoutAccountId,
		doc.DepositRequestId,
		doc.CreatedAt,
		events,
		doc.TemporalWorkflowId,
	)

	createdTransaction.Node = paging.NewNode(hit.Sort)

	return createdTransaction, nil
}

func marshalClubPayoutToDocument(pay *payout.ClubPayout) (*clubPayoutDocument, error) {

	var events []clubPayoutEventDocument

	for _, e := range pay.Events() {
		events = append(events, clubPayoutEventDocument{
			Id:        e.Id(),
			CreatedAt: e.CreatedAt(),
			Error:     e.Error(),
		})
	}

	return &clubPayoutDocument{
		Id:                 pay.Id(),
		Status:             pay.Status().String(),
		DepositDate:        pay.DepositDate(),
		ClubId:             pay.ClubId(),
		Currency:           pay.Currency().String(),
		Amount:             pay.Amount(),
		CoverFeeAmount:     pay.CoverFeeAmount(),
		TotalAmount:        pay.TotalAmount(),
		PayoutAccountId:    pay.PayoutAccountId(),
		DepositRequestId:   pay.DepositRequestId(),
		CreatedAt:          pay.CreatedAt(),
		Events:             events,
		TemporalWorkflowId: pay.TemporalWorkflowId(),
	}, nil
}

func (r PayoutCassandraElasticsearchRepository) SearchClubPayouts(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *payout.ClubPayoutsFilters) ([]*payout.ClubPayout, error) {

	builder := r.client.Search().
		Index(ClubPayoutsIndexName)

	if cursor == nil {
		return nil, paging.ErrCursorNotPresent
	}

	if err := cursor.BuildElasticsearch(builder, "created_at", "id", false); err != nil {
		return nil, err
	}

	// general search
	if filters.ClubId() == nil && filters.DepositRequestId() == nil {
		if !requester.IsStaff() {
			return nil, principal.ErrNotAuthorized
		}
	}

	if filters.ClubId() != nil {
		if err := canViewSensitive(ctx, requester, *filters.ClubId()); err != nil {
			return nil, err
		}
	}

	// only staff can look up by deposit
	if filters.DepositRequestId() != nil {
		if !requester.IsStaff() {
			return nil, principal.ErrNotAuthorized
		}
	}

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	if filters.ClubId() != nil {
		filterQueries = append(filterQueries, elastic.NewTermQuery("club_id", *filters.ClubId()))
	}

	if filters.DepositRequestId() != nil {
		filterQueries = append(filterQueries, elastic.NewTermQuery("deposit_request_id", *filters.DepositRequestId()))
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
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search club payouts")
	}

	var pays []*payout.ClubPayout

	for _, hit := range response.Hits.Hits {

		newTransaction, err := unmarshalClubPayoutDocument(hit)

		if err != nil {
			return nil, err
		}

		pays = append(pays, newTransaction)
	}

	return pays, nil
}

func (r PayoutCassandraElasticsearchRepository) IndexAllClubPayouts(ctx context.Context) error {

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, clubPayoutsTable, func(iter *gocqlx.Iterx) error {

		var pay clubPayout

		for iter.StructScan(&pay) {

			var events []clubPayoutEventDocument

			for _, e := range pay.Events {

				var unmarshal clubPayoutEvent

				if err := json.Unmarshal([]byte(e), &unmarshal); err != nil {
					return err
				}

				events = append(events, clubPayoutEventDocument{
					Id:        unmarshal.Id,
					CreatedAt: unmarshal.CreatedAt,
					Error:     unmarshal.Error,
				})
			}

			doc := clubPayoutDocument{
				Id:                 pay.Id,
				Status:             pay.Status,
				DepositDate:        pay.DepositDate,
				ClubId:             pay.ClubId,
				Currency:           pay.Currency,
				Amount:             pay.Amount,
				CoverFeeAmount:     pay.CoverFeeAmount,
				TotalAmount:        pay.TotalAmount,
				PayoutAccountId:    pay.PayoutAccountId,
				DepositRequestId:   pay.DepositRequestId,
				CreatedAt:          pay.CreatedAt,
				Events:             events,
				TemporalWorkflowId: pay.TemporalWorkflowId,
			}

			_, err := r.client.
				Index().
				Index(ClubPayoutsIndexName).
				Id(doc.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return errors.Wrap(support.ParseElasticError(err), "failed to index club payouts")
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r PayoutCassandraElasticsearchRepository) indexClubPayout(ctx context.Context, pay *payout.ClubPayout) error {

	pst, err := marshalClubPayoutToDocument(pay)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(ClubPayoutsIndexName).
		Id(pst.Id).
		BodyJson(*pst).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to index club payout")
	}

	return nil
}
