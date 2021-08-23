package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/bucket"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type postReport struct {
	Id                 string `db:"id"`
	PostId             string `db:"post_id"`
	Bucket             int    `db:"bucket"`
	ReportingAccountId string `db:"reporting_account_id"`
	PostReportReasonId string `db:"post_report_reason_id"`
}

var postReportTable = table.New(table.Metadata{
	Name: "post_reports",
	Columns: []string{
		"id",
		"post_id",
		"bucket",
		"reporting_account_id",
		"post_report_reason_id",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

var postReportByPostTable = table.New(table.Metadata{
	Name: "post_reports_by_post",
	Columns: []string{
		"post_id",
		"bucket",
		"id",
		"reporting_account_id",
		"post_report_reason_id",
	},
	PartKey: []string{"post_id", "bucket"},
	SortKey: []string{"id"},
})

var postReportForAccountAndPostTable = table.New(table.Metadata{
	Name: "post_report_for_account_and_post",
	Columns: []string{
		"post_id",
		"reporting_account_id",
		"bucket",
		"id",
		"post_report_reason_id",
	},
	PartKey: []string{"post_id", "reporting_account_id"},
	SortKey: []string{},
})

func marshalPostReportToDatabase(report *report.PostReport) (*postReport, error) {

	buck, err := bucket.MakeBucketFromKSUID(report.ID())

	if err != nil {
		return nil, err
	}

	return &postReport{
		Id:                 report.ID(),
		Bucket:             buck,
		PostId:             report.PostID(),
		ReportingAccountId: report.ReportingAccountId(),
		PostReportReasonId: report.ReportReason().ID(),
	}, nil
}

func (r ReportCassandraRepository) CreatePostReport(ctx context.Context, report *report.PostReport) error {

	marshalledPostReport, err := marshalPostReportToDatabase(report)

	if err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := postReportTable.Insert()

	batch.Query(stmt,
		marshalledPostReport.Id,
		marshalledPostReport.PostId,
		marshalledPostReport.Bucket,
		marshalledPostReport.ReportingAccountId,
		marshalledPostReport.PostReportReasonId,
	)

	stmt, _ = postReportByPostTable.Insert()

	batch.Query(stmt,
		marshalledPostReport.PostId,
		marshalledPostReport.Bucket,
		marshalledPostReport.Id,
		marshalledPostReport.ReportingAccountId,
		marshalledPostReport.PostReportReasonId,
	)

	stmt, _ = postReportForAccountAndPostTable.Insert()

	batch.Query(stmt,
		marshalledPostReport.PostId,
		marshalledPostReport.ReportingAccountId,
		marshalledPostReport.Bucket,
		marshalledPostReport.Id,
		marshalledPostReport.PostReportReasonId,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to create audit log: %v", err)
	}

	return nil
}

func (r ReportCassandraRepository) GetPostReport(ctx context.Context, requester *principal.Principal, logId string) (*report.PostReport, error) {

	postReportQuery := r.session.
		Query(postReportTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postReport{
			Id: logId,
		})

	var postRep postReport

	if err := postReportQuery.Get(&postRep); err != nil {

		if err == gocql.ErrNotFound {
			return nil, report.ErrPostReportNotFound
		}

		return nil, fmt.Errorf("failed to get report for post: %v", err)
	}

	reportReason, err := r.GetPostReportReason(ctx, requester, postRep.PostReportReasonId)

	if err != nil {
		return nil, err
	}

	rep := report.UnmarshalPostReportFromDatabase(
		postRep.Id,
		postRep.PostId,
		postRep.ReportingAccountId,
		reportReason,
	)

	if err := rep.CanView(requester); err != nil {
		return nil, err
	}

	return rep, nil
}

func (r ReportCassandraRepository) SearchPostReports(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *report.PostReportFilters) ([]*report.PostReport, error) {
	var postReports []*report.PostReport

	if cursor.IsEmpty() {
		return postReports, nil
	}

	if err := report.CanViewWithFilters(requester, filters); err != nil {
		return nil, err
	}

	info := &postReport{
		Bucket: bucket.MakeBucketFromTimestamp(time.Now()),
		PostId: filters.PostId(),
	}

	builder := postReportByPostTable.
		SelectBuilder().
		Where(qb.Eq(filters.PostId()))

	if cursor != nil {
		cursor.BuildCassandra(builder, "id")
	}

	var results []*postReport

	if err := builder.
		Query(r.session).
		BindStruct(info).
		Select(&results); err != nil {
		return nil, fmt.Errorf("failed to search post reports: %v", err)
	}

	reportReasonMap, err := r.getPostReportReasonsAsMap(ctx, requester)
	if err != nil {
		return nil, err
	}

	for _, postRep := range results {

		// grab report reason from the map
		if reportReason, ok := reportReasonMap[postRep.PostReportReasonId]; ok {
			result := report.UnmarshalPostReportFromDatabase(
				postRep.Id,
				postRep.PostId,
				postRep.ReportingAccountId,
				reportReason,
			)

			result.Node = paging.NewNode(postRep.Id)
			postReports = append(postReports, result)

		} else {
			return nil, report.ErrPostReportReasonNotFound
		}
	}

	return postReports, nil
}

func (r ReportCassandraRepository) GetPostReportForAccount(ctx context.Context, requester *principal.Principal, postId, accountId string) (*report.PostReport, error) {

	postReportQuery := r.session.
		Query(postReportForAccountAndPostTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postReport{
			PostId:             postId,
			ReportingAccountId: accountId,
		})

	var postRep postReport

	if err := postReportQuery.Get(&postRep); err != nil {

		if err == gocql.ErrNotFound {
			return nil, report.ErrPostReportNotFound
		}

		return nil, fmt.Errorf("failed to get report for post: %v", err)
	}

	reportReason, err := r.GetPostReportReason(ctx, requester, postRep.PostReportReasonId)

	if err != nil {
		return nil, err
	}

	rep := report.UnmarshalPostReportFromDatabase(
		postRep.Id,
		postRep.PostId,
		postRep.ReportingAccountId,
		reportReason,
	)

	if err := rep.CanView(requester); err != nil {
		return nil, err
	}

	return rep, nil
}
