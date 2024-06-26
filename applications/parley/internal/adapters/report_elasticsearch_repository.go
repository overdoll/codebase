package adapters

import (
	"context"
	"encoding/json"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"go.uber.org/zap"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/cache"
	"overdoll/libraries/database"
	"overdoll/libraries/errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
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

var PostReportsReaderIndex = cache.ReadAlias(CachePrefix, PostReportsIndexName)
var postReportsWriterIndex = cache.WriteAlias(CachePrefix, PostReportsIndexName)

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
		Index(PostReportsReaderIndex)

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
		Index(postReportsWriterIndex).
		Id(clb.Id).
		BodyJson(*clb).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "indexPostReport")
	}

	return nil
}

func (r ReportCassandraElasticsearchRepository) IndexAllPostReports(ctx context.Context) error {

	scanner := database.NewScan(r.session,
		database.ScanConfig{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, postReportTable, func(iter *gocqlx.Iterx) error {

		var m postReport

		for iter.StructScan(&m) {

			doc, err := marshalPostReportToDocument(unmarshalPostReportFromDatabase(&m))

			if err != nil {
				return err
			}

			_, err = r.client.
				Index().
				Index(postReportsWriterIndex).
				Id(doc.Id).
				OpType("create").
				BodyJson(doc).
				Do(ctx)

			e, ok := err.(*elastic.Error)
			if ok && e.Details.Type == "version_conflict_engine_exception" {
				zap.S().Infof("skipping document [%s] due to conflict", doc.Id)
			} else {
				return errors.Wrap(support.ParseElasticError(err), "failed to index post report")
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

	if _, err := r.client.Delete().Index(postReportsWriterIndex).Id(postId + "-" + accountId).Do(ctx); err != nil {
		return errors.Wrap(support.ParseElasticError(err), "deletePostReportsIndexById")
	}

	return nil
}
