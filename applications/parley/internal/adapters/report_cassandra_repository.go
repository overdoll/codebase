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
	RuleId             string `db:"rule_id"`
}

type postReportInit struct {
	Init   int `db:"init"`
	Bucket int `db:"bucket"`
}

var postReportTable = table.New(table.Metadata{
	Name: "post_reports",
	Columns: []string{
		"id",
		"post_id",
		"bucket",
		"reporting_account_id",
		"rule_id",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

var postReportsByBucketTable = table.New(table.Metadata{
	Name: "post_reports_by_bucket",
	Columns: []string{
		"post_id",
		"bucket",
		"id",
		"reporting_account_id",
		"rule_id",
	},
	PartKey: []string{"bucket"},
	SortKey: []string{"id"},
})

var postReportsByAccountAndBucketTable = table.New(table.Metadata{
	Name: "post_report_by_account_and_bucket",
	Columns: []string{
		"bucket",
		"reporting_account_id",
		"id",
		"post_id",
		"rule_id",
	},
	PartKey: []string{"bucket", "reporting_account_id"},
	SortKey: []string{"id"},
})

var postReportsByAccountAndBucketBucketsTable = table.New(table.Metadata{
	Name: "post_report_by_account_and_bucket_buckets",
	Columns: []string{
		"reporting_account_id",
		"bucket",
	},
	PartKey: []string{"reporting_account_id"},
	SortKey: []string{"bucket"},
})

var postReportsBucketsTable = table.New(table.Metadata{
	Name: "post_reports_buckets",
	Columns: []string{
		"init",
		"bucket",
	},
	PartKey: []string{"init"},
	SortKey: []string{"bucket"},
})

var postReportsByPostBucketsTable = table.New(table.Metadata{
	Name: "post_report_by_post_buckets",
	Columns: []string{
		"post_id",
		"bucket",
	},
	PartKey: []string{"post_id"},
	SortKey: []string{"bucket"},
})

var postReportByPostTable = table.New(table.Metadata{
	Name: "post_reports_by_post",
	Columns: []string{
		"post_id",
		"bucket",
		"id",
		"reporting_account_id",
		"rule_id",
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
		"rule_id",
	},
	PartKey: []string{"post_id", "reporting_account_id"},
	SortKey: []string{},
})

type ReportCassandraRepository struct {
	session gocqlx.Session
}

func NewReportCassandraRepository(session gocqlx.Session) ReportCassandraRepository {
	return ReportCassandraRepository{session: session}
}

func marshalPostReportToDatabase(report *report.PostReport) (*postReport, error) {

	buck, err := bucket.MakeWeeklyBucketFromUUID(report.ID())

	if err != nil {
		return nil, err
	}

	return &postReport{
		Id:                 report.ID(),
		Bucket:             buck,
		PostId:             report.PostID(),
		ReportingAccountId: report.ReportingAccountId(),
		RuleId:             report.RuleId(),
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
		marshalledPostReport.RuleId,
	)

	stmt, _ = postReportByPostTable.Insert()

	batch.Query(stmt,
		marshalledPostReport.PostId,
		marshalledPostReport.Bucket,
		marshalledPostReport.Id,
		marshalledPostReport.ReportingAccountId,
		marshalledPostReport.RuleId,
	)

	stmt, _ = postReportForAccountAndPostTable.Insert()

	batch.Query(stmt,
		marshalledPostReport.PostId,
		marshalledPostReport.ReportingAccountId,
		marshalledPostReport.Bucket,
		marshalledPostReport.Id,
		marshalledPostReport.RuleId,
	)

	stmt, _ = postReportsByBucketTable.Insert()

	batch.Query(stmt,
		marshalledPostReport.PostId,
		marshalledPostReport.Bucket,
		marshalledPostReport.Id,
		marshalledPostReport.ReportingAccountId,
		marshalledPostReport.RuleId,
	)

	stmt, _ = postReportsByAccountAndBucketTable.Insert()

	batch.Query(stmt,
		marshalledPostReport.Bucket,
		marshalledPostReport.ReportingAccountId,
		marshalledPostReport.Id,
		marshalledPostReport.PostId,
		marshalledPostReport.RuleId,
	)

	stmt, _ = postReportsByAccountAndBucketBucketsTable.Insert()

	batch.Query(stmt,
		marshalledPostReport.ReportingAccountId,
		marshalledPostReport.Bucket,
	)

	stmt, _ = postReportsByPostBucketsTable.Insert()

	batch.Query(stmt,
		marshalledPostReport.PostId,
		marshalledPostReport.Bucket,
	)

	stmt, _ = postReportsByBucketTable.Insert()

	batch.Query(stmt,
		0,
		marshalledPostReport.Bucket,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to create report log: %v", err)
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

	rep := report.UnmarshalPostReportFromDatabase(
		postRep.Id,
		postRep.PostId,
		postRep.ReportingAccountId,
		postRep.RuleId,
	)

	if err := rep.CanView(requester); err != nil {
		return nil, err
	}

	return rep, nil
}

func (r ReportCassandraRepository) getPostReportsBucketForPost(ctx context.Context, postId string) ([]int, error) {

	var buckets []postReport

	if err := r.session.Query(postReportsByPostBucketsTable.Select()).
		Consistency(gocql.LocalQuorum).
		BindStruct(postReport{
			PostId: postId,
		}).
		Select(&buckets); err != nil {
		return nil, fmt.Errorf("failed to get post reports by post buckets: %v", err)
	}

	var final []int

	for _, b := range buckets {
		final = append(final, b.Bucket)
	}

	return final, nil
}

func (r ReportCassandraRepository) getPostReportsBuckets(ctx context.Context) ([]int, error) {

	var buckets []postReportInit

	if err := r.session.Query(postReportsBucketsTable.Select()).
		Consistency(gocql.LocalQuorum).
		BindStruct(postReportInit{
			Init: 0,
		}).
		Select(&buckets); err != nil {
		return nil, fmt.Errorf("failed to get post reports buckets: %v", err)
	}

	var final []int

	for _, b := range buckets {
		final = append(final, b.Bucket)
	}

	return final, nil
}

func (r ReportCassandraRepository) getPostReportsByAccountBuckets(ctx context.Context, accountId string) ([]int, error) {

	var buckets []postReport

	if err := r.session.Query(postReportsByAccountAndBucketBucketsTable.Select()).
		Consistency(gocql.LocalQuorum).
		BindStruct(postReport{
			ReportingAccountId: accountId,
		}).
		Select(&buckets); err != nil {
		return nil, fmt.Errorf("failed to get post reports by account buckets: %v", err)
	}

	var final []int

	for _, b := range buckets {
		final = append(final, b.Bucket)
	}

	return final, nil
}

func (r ReportCassandraRepository) SearchPostReports(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *report.PostReportFilters) ([]*report.PostReport, error) {

	var postReports []*report.PostReport

	if err := report.CanViewWithFilters(requester, filters); err != nil {
		return nil, err
	}

	var buckets []int
	var err error

	if filters.PostId() != nil {
		buckets, err = r.getPostReportsBucketForPost(ctx, *filters.PostId())
		if err != nil {
			return nil, err
		}
	} else {
		buckets, err = r.getPostReportsBuckets(ctx)
		if err != nil {
			return nil, err
		}
	}

	// iterate through all buckets starting from x bucket until we have enough values
	for _, bucketId := range buckets {

		if bucketId > bucket.MakeWeeklyBucketFromTimestamp(filters.From()) {
			continue
		}

		if filters.To() != nil {
			if bucketId < bucket.MakeWeeklyBucketFromTimestamp(*filters.To()) {
				continue
			}
		}

		info := map[string]interface{}{
			"bucket":  bucketId,
			"post_id": filters.PostId(),
		}

		var builder *qb.SelectBuilder

		if filters.PostId() != nil {
			builder = qb.Select(postReportByPostTable.Name()).
				Where(qb.Eq("bucket"), qb.Eq("post_id"))
		} else {
			builder = qb.Select(postReportsByBucketTable.Name()).
				Where(qb.Eq("bucket"))
		}

		if err := cursor.BuildCassandra(builder, "id", false); err != nil {
			return nil, err
		}

		var results []*postReport

		if err := builder.
			Query(r.session).
			BindMap(info).
			Select(&results); err != nil {
			return nil, fmt.Errorf("failed to search post reports: %v", err)
		}

		for _, postRep := range results {

			result := report.UnmarshalPostReportFromDatabase(
				postRep.Id,
				postRep.PostId,
				postRep.ReportingAccountId,
				postRep.RuleId,
			)

			result.Node = paging.NewNode(postRep.Id)
			postReports = append(postReports, result)
		}

		if len(postReports) >= cursor.GetLimit() {
			break
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

	rep := report.UnmarshalPostReportFromDatabase(
		postRep.Id,
		postRep.PostId,
		postRep.ReportingAccountId,
		postRep.RuleId,
	)

	if err := rep.CanView(requester); err != nil {
		return nil, err
	}

	return rep, nil
}

func (r ReportCassandraRepository) DeleteAccountData(ctx context.Context, accountId string) error {

	buckets, err := r.getPostReportsByAccountBuckets(ctx, accountId)

	if err != nil {
		return err
	}
	// iterate through all buckets starting from x bucket until we have enough values
	for _, bucketId := range buckets {

		builder := qb.Select(postReportsByAccountAndBucketTable.Name()).
			Where(qb.Eq("bucket"), qb.Eq("reporting_account_id"))

		var results []*postReport

		if err := builder.
			Query(r.session).
			BindStruct(postReport{Bucket: bucketId, ReportingAccountId: accountId}).
			Select(&results); err != nil {
			return fmt.Errorf("failed to search post reports: %v", err)
		}

		if len(results) == 0 {
			continue
		}

		// batch delete
		batch := r.session.NewBatch(gocql.LoggedBatch)

		for _, postRep := range results {

			stmt, _ := postReportTable.Delete()

			batch.Query(stmt,
				postRep.Id,
			)

			stmt, _ = postReportByPostTable.Delete()

			batch.Query(stmt,
				postRep.PostId,
				postRep.Bucket,
				postRep.Id,
			)

			stmt, _ = postReportForAccountAndPostTable.Delete()

			batch.Query(stmt,
				postRep.PostId,
				postRep.ReportingAccountId,
			)

			stmt, _ = postReportsByBucketTable.Delete()

			batch.Query(stmt,
				postRep.Bucket,
				postRep.Id,
			)

			stmt, _ = postReportsByAccountAndBucketTable.Delete()

			batch.Query(stmt,
				postRep.Bucket,
				postRep.ReportingAccountId,
				postRep.Id,
			)
		}

		if err := r.session.ExecuteBatch(batch); err != nil {
			return fmt.Errorf("failed to delete report log: %v", err)
		}
	}

	// delete all buckets for this account as well
	if err := r.session.Query(qb.
		Delete(postReportsByAccountAndBucketBucketsTable.Name()).
		Where(qb.Eq("account_id")).
		ToCql()).
		Consistency(gocql.LocalQuorum).
		BindStruct(postReport{
			ReportingAccountId: accountId,
		}).
		Select(&buckets); err != nil {
		return fmt.Errorf("failed to delete post reports by account buckets: %v", err)
	}

	return nil
}
