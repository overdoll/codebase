package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
	"time"
)

type postReportDocument struct {
	Id                 string    `json:"id"`
	PostId             string    `json:"post_id"`
	ReportingAccountId string    `json:"reporting_account_id"`
	RuleId             string    `json:"rule_id"`
	CreatedAt          time.Time `json:"joined_at"`
}

const postReportIndexProperties = `
{
	"id": {
		"type": "keyword"
	},
	"reporting_account_id": {
		"type": "keyword"
	},
	"post_id": {
		"type": "keyword"
	},
	"rule_id": {
		"type": "keyword"
	},
	"created_at": {
		"type": "date"
	},

}
`

const postReportsIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties":` + postReportIndexProperties + `
	}
}`

const PostReportsIndexName = "post_reports"

func marshalPostReportToDocument(cat *report.PostReport) (*postReportDocument, error) {
	return &postReportDocument{
		Id:                 cat.PostId() + "-" + cat.ReportingAccountId(),
		PostId:             cat.PostId(),
		ReportingAccountId: cat.ReportingAccountId(),
		RuleId:             cat.RuleId(),
		CreatedAt:          cat.CreatedAt(),
	}, nil
}

func (r ReportCassandraElasticsearchRepository) SearchPostReports(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *report.PostReportFilters) ([]*report.PostReport, error) {

	if err := report.CanViewWithFilters(requester, filters); err != nil {
		return nil, err
	}

	builder := r.client.Search().
		Index(PostReportsIndexName)

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
	}

	if err := cursor.BuildElasticsearch(builder, "created_at", "id", false); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	if filters.PostId() != nil {
		query.Filter(elastic.NewTermQuery("post_id", *filters.PostId()))
	}

	builder.Query(query)

	response, err := builder.ErrorTrace(true).Pretty(true).Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed search club members: %v", err)
	}

	var reports []*report.PostReport

	for _, hit := range response.Hits.Hits {

		var rpt postReportDocument

		err := json.Unmarshal(hit.Source, &rpt)

		if err != nil {
			return nil, fmt.Errorf("failed search post reports - unmarshal: %v", err)
		}

		rep := report.UnmarshalPostReportFromDatabase(rpt.PostId, rpt.ReportingAccountId, rpt.RuleId, rpt.CreatedAt)
		rep.Node = paging.NewNode(hit.Sort)

		reports = append(reports, rep)
	}

	return reports, nil
}

func (r ReportCassandraElasticsearchRepository) indexPostReport(ctx context.Context, club *report.PostReport) error {

	clb, err := marshalPostReportToDocument(club)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(PostReportsIndexName).
		Id(clb.Id).
		BodyJson(*clb).
		Do(ctx)

	if err != nil {
		return fmt.Errorf("failed to index post report: %v", err)
	}

	return nil
}

func (r ReportCassandraElasticsearchRepository) indexAllPostReports(ctx context.Context) error {

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, postReportTable, func(iter *gocqlx.Iterx) error {

		var m postReport

		for iter.StructScan(&m) {

			doc := postReportDocument{
				Id:                 m.PostId + "-" + m.ReportingAccountId,
				PostId:             m.PostId,
				ReportingAccountId: m.ReportingAccountId,
				RuleId:             m.RuleId,
				CreatedAt:          m.CreatedAt,
			}

			_, err := r.client.
				Index().
				Index(PostReportsIndexName).
				Id(doc.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return fmt.Errorf("failed to index post report: %v", err)
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r ReportCassandraElasticsearchRepository) DeleteAndRecreatePostReportsIndex(ctx context.Context) error {
	if err := r.deletePostReportsIndex(ctx); err != nil {
		return err
	}

	return r.indexAllPostReports(ctx)
}

func (r ReportCassandraElasticsearchRepository) deletePostReportsIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(PostReportsIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(PostReportsIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(PostReportsIndexName).BodyString(postReportsIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}

func (r ReportCassandraElasticsearchRepository) deletePostReportsIndexById(ctx context.Context, postId, accountId string) error {

	if _, err := r.client.Delete().Index(PostReportsIndexName).Id(postId + "-" + accountId).Do(ctx); err != nil {
		return fmt.Errorf("failed to delete post report: %v", err)
	}

	return nil
}
