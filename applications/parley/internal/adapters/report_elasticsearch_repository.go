package adapters

import (
	"context"
	"encoding/json"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
	"overdoll/libraries/support"
	"time"
)

type postReportDocument struct {
	Id                 string    `json:"id"`
	PostId             string    `json:"post_id"`
	ReportingAccountId string    `json:"reporting_account_id"`
	RuleId             string    `json:"rule_id"`
	CreatedAt          time.Time `json:"created_at"`
}

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
		return nil, paging.ErrCursorNotPresent
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
		return nil, errors.Wrap(support.ParseElasticError(err), "SearchPostReports")
	}

	var reports []*report.PostReport

	for _, hit := range response.Hits.Hits {

		var rpt postReportDocument

		err := json.Unmarshal(hit.Source, &rpt)

		if err != nil {
			return nil, errors.Wrap(err, "SearchPostReports - Unmarshal")
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
		return errors.Wrap(support.ParseElasticError(err), "indexPostReport")
	}

	return nil
}

func (r ReportCassandraElasticsearchRepository) IndexAllPostReports(ctx context.Context) error {

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
				return errors.Wrap(support.ParseElasticError(err), "IndexAllPostReports")
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r ReportCassandraElasticsearchRepository) deletePostReportsIndexById(ctx context.Context, postId, accountId string) error {

	if _, err := r.client.Delete().Index(PostReportsIndexName).Id(postId + "-" + accountId).Do(ctx); err != nil {
		return errors.Wrap(support.ParseElasticError(err), "deletePostReportsIndexById")
	}

	return nil
}
