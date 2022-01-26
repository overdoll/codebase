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
	"overdoll/libraries/localization"
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
		"title",
		"description",
		"link",
		"deprecated",
	},
	PartKey: []string{"bucket"},
	SortKey: []string{"id"},
})

type postReportReason struct {
	Id          string            `db:"id"`
	Bucket      int               `db:"bucket"`
	Title       map[string]string `db:"title"`
	Description map[string]string `db:"description"`
	Link        *string           `db:"link"`
	Deprecated  bool              `db:"deprecated"`
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

func marshalPostReportReasonToDatabase(postReport *report.PostReportReason) *postReportReason {
	return &postReportReason{
		Id:          postReport.ID(),
		Bucket:      0,
		Title:       localization.MarshalTranslationToDatabase(postReport.Title()),
		Description: localization.MarshalTranslationToDatabase(postReport.Description()),
		Link:        postReport.Link(),
		Deprecated:  postReport.Deprecated(),
	}
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

func (r ReportCassandraRepository) GetPostReportById(ctx context.Context, requester *principal.Principal, logId string) (*report.PostReport, error) {

	var postRep postReport

	if err := r.session.
		Query(postReportTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postReport{
			Id: logId,
		}).
		Get(&postRep); err != nil {

		if err == gocql.ErrNotFound {
			return nil, report.ErrPostReportNotFound
		}

		return nil, fmt.Errorf("failed to get report for post: %v", err)
	}

	reportReason, err := r.GetPostReportReasonById(ctx, postRep.PostReportReasonId)

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

func (r ReportCassandraRepository) GetPostReportForPostAndAccount(ctx context.Context, requester *principal.Principal, postId, accountId string) (*report.PostReport, error) {

	var postRep postReport

	if err := r.session.
		Query(postReportForAccountAndPostTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(
			&postReport{
				PostId:             postId,
				ReportingAccountId: accountId,
			},
		).
		Get(&postRep); err != nil {

		if err == gocql.ErrNotFound {
			return nil, report.ErrPostReportNotFound
		}

		return nil, fmt.Errorf("failed to get report for post: %v", err)
	}

	reportReason, err := r.GetPostReportReasonById(ctx, postRep.PostReportReasonId)

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

// since we dont want to duplicate report reasons (they're subject to changes like translations or updates) we can use this function to get all
// rejection reasons as a map, which can then be used to map account reports to posts
func (r ReportCassandraRepository) getPostReportReasonsAsMap(ctx context.Context, requester *principal.Principal) (map[string]*report.PostReportReason, error) {

	reportReasons, err := r.GetPostReportReasons(ctx, nil, true)

	if err != nil {
		return nil, err
	}

	reportReasonMap := make(map[string]*report.PostReportReason)

	for _, reason := range reportReasons {
		reportReasonMap[reason.ID()] = reason
	}

	return reportReasonMap, nil
}

func (r ReportCassandraRepository) GetPostReportReasonById(ctx context.Context, id string) (*report.PostReportReason, error) {

	var reportReason postReportReason

	if err := r.session.
		Query(postReportReasonTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postReportReason{Id: id, Bucket: 0}).
		Get(&reportReason); err != nil {

		if err == gocql.ErrNotFound {
			return nil, report.ErrPostReportReasonNotFound
		}

		return nil, fmt.Errorf("failed to get post report reason: %v", err)
	}

	return report.UnmarshalPostReportReasonFromDatabase(
		reportReason.Id,
		reportReason.Title,
		reportReason.Description,
		reportReason.Link,
		reportReason.Deprecated,
	), nil
}

func (r ReportCassandraRepository) GetPostReportReasons(ctx context.Context, cursor *paging.Cursor, deprecated bool) ([]*report.PostReportReason, error) {

	builder := postReportReasonTable.SelectBuilder()

	data := &postReportReason{Bucket: 0}

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "id", true); err != nil {
			return nil, err
		}
	}

	var dbReportReasons []postReportReason

	if err := builder.
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(data).
		Select(&dbReportReasons); err != nil {
		return nil, fmt.Errorf("failed to get report reasons: %v", err)
	}

	var reportReasons []*report.PostReportReason
	for _, reportReason := range dbReportReasons {

		// skip over deprecated
		if reportReason.Deprecated && !deprecated {
			continue
		}

		reason := report.UnmarshalPostReportReasonFromDatabase(
			reportReason.Id,
			reportReason.Title,
			reportReason.Description,
			reportReason.Link,
			reportReason.Deprecated,
		)

		reason.Node = paging.NewNode(reportReason.Id)
		reportReasons = append(reportReasons, reason)
	}

	return reportReasons, nil
}

func (r ReportCassandraRepository) CreatePostReportReason(ctx context.Context, postReportReason *report.PostReportReason) error {

	if err := r.session.
		Query(postRejectionReasonTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalPostReportReasonToDatabase(postReportReason)).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to insert report reason: %v", err)
	}

	return nil
}

func (r ReportCassandraRepository) updatePostReportReason(ctx context.Context, postReportReasonId string, updateFn func(postReportReason *report.PostReportReason) error, columns []string) (*report.PostReportReason, error) {

	postReportR, err := r.GetPostReportReasonById(ctx, postReportReasonId)

	if err != nil {
		return nil, err
	}

	if err = updateFn(postReportR); err != nil {
		return nil, err
	}

	if err := r.session.
		Query(postReportReasonTable.Update(
			columns...,
		)).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalPostReportReasonToDatabase(postReportR)).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update post report reason: %v", err)
	}

	return postReportR, nil
}

func (r ReportCassandraRepository) UpdatePostReportReasonTitle(ctx context.Context, postReportReasonId string, updateFn func(postReportReason *report.PostReportReason) error) (*report.PostReportReason, error) {
	return r.updatePostReportReason(ctx, postReportReasonId, updateFn, []string{"title"})
}

func (r ReportCassandraRepository) UpdatePostReportReasonDescription(ctx context.Context, postReportReasonId string, updateFn func(postReportReason *report.PostReportReason) error) (*report.PostReportReason, error) {
	return r.updatePostReportReason(ctx, postReportReasonId, updateFn, []string{"description"})
}

func (r ReportCassandraRepository) UpdatePostReportReasonLink(ctx context.Context, postReportReasonId string, updateFn func(postReportReason *report.PostReportReason) error) (*report.PostReportReason, error) {
	return r.updatePostReportReason(ctx, postReportReasonId, updateFn, []string{"link"})
}

func (r ReportCassandraRepository) UpdatePostReportReasonDeprecated(ctx context.Context, postReportReasonId string, updateFn func(postReportReason *report.PostReportReason) error) (*report.PostReportReason, error) {
	return r.updatePostReportReason(ctx, postReportReasonId, updateFn, []string{"deprecated"})
}
