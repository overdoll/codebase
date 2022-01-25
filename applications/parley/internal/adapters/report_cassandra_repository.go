package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
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

var postReportReasonTable = table.New(table.Metadata{
	Name: "post_report_reasons",
	Columns: []string{
		"id",
		"bucket",
		"reason",
	},
	PartKey: []string{"bucket"},
	SortKey: []string{"id"},
})

type postReportReason struct {
	Id     string            `db:"id"`
	Bucket int               `db:"bucket"`
	Reason map[string]string `db:"reason"`
}

type ReportCassandraRepository struct {
	session gocqlx.Session
}

func NewReportCassandraRepository(session gocqlx.Session) ReportCassandraRepository {
	return ReportCassandraRepository{session: session}
}

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

	info := map[string]interface{}{
		"bucket":  bucket.MakeBucketsFromTimeRange(filters.From(), filters.To()),
		"post_id": filters.PostId(),
	}

	builder := qb.Select(postReportByPostTable.Name()).
		Where(qb.In("bucket"), qb.Eq("post_id"))

	if err := cursor.BuildCassandra(builder, "id", true); err != nil {
		return nil, err
	}

	var results []*postReport

	if err := builder.
		Query(r.session).
		// need to disable paging since we do orderBy and IN queries
		PageSize(0).
		BindMap(info).
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

func (r ReportCassandraRepository) GetPostReportReason(ctx context.Context, requester *principal.Principal, id string) (*report.PostReportReason, error) {

	reportReasonQuery := r.session.
		Query(postReportReasonTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postReportReason{Id: id, Bucket: 0})

	var reportReason postReportReason

	if err := reportReasonQuery.Get(&reportReason); err != nil {

		if err == gocql.ErrNotFound {
			return nil, report.ErrPostReportReasonNotFound
		}

		return nil, fmt.Errorf("failed to get post report reason: %v", err)
	}

	reason := report.UnmarshalPostReportReasonFromDatabase(reportReason.Id, reportReason.Reason)

	if err := reason.CanView(requester); err != nil {
		return nil, err
	}

	return reason, nil
}

func (r ReportCassandraRepository) GetPostReportReasons(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*report.PostReportReason, error) {

	if err := report.CanViewPostReportReasons(requester); err != nil {
		return nil, err
	}

	builder := postReportReasonTable.SelectBuilder()

	data := &postReportReason{Bucket: 0}

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "id", true); err != nil {
			return nil, err
		}
	}

	reportReasonQuery := builder.
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(data)

	var dbReportReasons []postReportReason

	if err := reportReasonQuery.Select(&dbReportReasons); err != nil {
		return nil, fmt.Errorf("failed to get report reasons: %v", err)
	}

	var reportReasons []*report.PostReportReason
	for _, reportReason := range dbReportReasons {

		reason := report.UnmarshalPostReportReasonFromDatabase(reportReason.Id, reportReason.Reason)

		reason.Node = paging.NewNode(reportReason.Id)
		reportReasons = append(reportReasons, reason)
	}

	return reportReasons, nil
}

// since we dont want to duplicate report reasons (they're subject to changes like translations or updates) we can use this function to get all
// rejection reasons as a map, which can then be used to map account reports to posts
func (r ReportCassandraRepository) getPostReportReasonsAsMap(ctx context.Context, requester *principal.Principal) (map[string]*report.PostReportReason, error) {

	reportReasons, err := r.GetPostReportReasons(ctx, requester, nil)

	if err != nil {
		return nil, err
	}

	reportReasonMap := make(map[string]*report.PostReportReason)

	for _, reason := range reportReasons {
		reportReasonMap[reason.ID()] = reason
	}

	return reportReasonMap, nil
}
