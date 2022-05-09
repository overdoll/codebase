package adapters

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
	"time"
)

const clubPayoutsIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
				"id": {
					"type": "keyword"
				},
				"status": {
					"type": "keyword"
				},
				"deposit_date": {
					"type": "date"
				},
				"club_id": {
					"type": "keyword"
				},
				"currency": {
					"type": "keyword"
				},
				"amount": {
					"type": "integer"
				},
				"payout_account_id": {
					"type": "keyword"
				},
				"deposit_request_id": {
					"type": "keyword"
				},
				"timestamp": {
					"type": "date"
				},
				"temporal_workflow_id": {
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
						"error": {
							"type": "keyword"
						}
					}
				}
		}
	}
}`

type clubPayoutEventDocument struct {
	Id        string    `json:"id"`
	Timestamp time.Time `json:"timestamp"`
	Error     string    `json:"error"`
}

type clubPayoutDocument struct {
	Id                 string                    `json:"id"`
	Status             string                    `json:"status"`
	DepositDate        time.Time                 `json:"deposit_date"`
	ClubId             string                    `json:"club_id"`
	Currency           string                    `json:"currency"`
	Amount             int64                     `json:"amount"`
	PayoutAccountId    string                    `json:"payout_account_id"`
	DepositRequestId   string                    `json:"deposit_request_id"`
	Timestamp          time.Time                 `json:"timestamp"`
	Events             []clubPayoutEventDocument `json:"events"`
	TemporalWorkflowId string                    `json:"temporal_workflow_id"`
}

const ClubPayoutsIndexName = "club_payouts"

func unmarshalClubPayoutDocument(hit *elastic.SearchHit) (*payout.ClubPayout, error) {

	var doc clubPayoutDocument

	err := json.Unmarshal(hit.Source, &doc)

	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal club payout: %v", err)
	}

	var events []*payout.ClubPayoutEvent

	for _, evt := range doc.Events {
		events = append(events, payout.UnmarshalClubPayoutEventFromDatabase(
			evt.Id,
			evt.Timestamp,
			evt.Error,
		))
	}

	createdTransaction := payout.UnmarshalClubPayoutFromDatabase(
		doc.Id,
		doc.Status,
		doc.ClubId,
		doc.Currency,
		doc.Amount,
		doc.DepositDate,
		doc.PayoutAccountId,
		doc.DepositRequestId,
		doc.Timestamp,
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
			Timestamp: e.Timestamp(),
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
		PayoutAccountId:    pay.PayoutAccountId(),
		DepositRequestId:   pay.DepositRequestId(),
		Timestamp:          pay.Timestamp(),
		Events:             events,
		TemporalWorkflowId: pay.TemporalWorkflowId(),
	}, nil
}

func (r PayoutCassandraElasticsearchRepository) SearchClubPayouts(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *payout.ClubPayoutsFilters) ([]*payout.ClubPayout, error) {

	builder := r.client.Search().
		Index(ClubPayoutsIndexName)

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
	}

	if err := cursor.BuildElasticsearch(builder, "timestamp", "id", false); err != nil {
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
		return nil, fmt.Errorf("failed to search club payouts: %v", err)
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

func (r PayoutCassandraElasticsearchRepository) indexAllClubPayouts(ctx context.Context) error {

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
					Timestamp: unmarshal.Timestamp,
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
				PayoutAccountId:    pay.PayoutAccountId,
				DepositRequestId:   pay.DepositRequestId,
				Timestamp:          pay.Timestamp,
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
				return fmt.Errorf("failed to index club payouts: %v", err)
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r PayoutCassandraElasticsearchRepository) deleteClubPayoutsIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(ClubPayoutsIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(ClubPayoutsIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(ClubPayoutsIndexName).BodyString(clubPayoutsIndex).Do(ctx); err != nil {
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
		return fmt.Errorf("failed to index club payout: %v", err)
	}

	return nil
}

func (r PayoutCassandraElasticsearchRepository) DeleteAndRecreateClubPayoutsIndex(ctx context.Context) error {

	if err := r.deleteClubPayoutsIndex(ctx); err != nil {
		return err
	}

	return r.indexAllClubPayouts(ctx)
}
