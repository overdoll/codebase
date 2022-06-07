package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/bucket"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
	"time"
)

type postReport struct {
	PostId             string    `db:"post_id"`
	Bucket             int       `db:"bucket"`
	ReportingAccountId string    `db:"reporting_account_id"`
	RuleId             string    `db:"rule_id"`
	CreatedAt          time.Time `db:"created_at"`
}

var postReportTable = table.New(table.Metadata{
	Name: "post_reports",
	Columns: []string{
		"post_id",
		"reporting_account_id",
		"bucket",
		"rule_id",
		"created_at",
	},
	PartKey: []string{"post_id", "reporting_account_id"},
	SortKey: []string{},
})

var postReportsByAccountBucketsTable = table.New(table.Metadata{
	Name: "post_report_by_account_buckets",
	Columns: []string{
		"reporting_account_id",
		"bucket",
	},
	PartKey: []string{"reporting_account_id"},
	SortKey: []string{"bucket"},
})

var postReportsByAccountTable = table.New(table.Metadata{
	Name: "post_report_by_account",
	Columns: []string{
		"post_id",
		"reporting_account_id",
		"bucket",
		"rule_id",
		"created_at",
	},
	PartKey: []string{"bucket", "reporting_account_id"},
	SortKey: []string{"post_id"},
})

type ReportCassandraElasticsearchRepository struct {
	session gocqlx.Session
	client  *elastic.Client
}

func NewReportCassandraElasticsearchRepository(session gocqlx.Session, client *elastic.Client) ReportCassandraElasticsearchRepository {
	return ReportCassandraElasticsearchRepository{session: session, client: client}
}

func marshalPostReportToDatabase(report *report.PostReport) *postReport {
	return &postReport{
		Bucket:             bucket.MakeMonthlyBucketFromTimestamp(report.CreatedAt()),
		PostId:             report.PostId(),
		ReportingAccountId: report.ReportingAccountId(),
		RuleId:             report.RuleId(),
	}
}

func (r ReportCassandraElasticsearchRepository) CreatePostReport(ctx context.Context, report *report.PostReport) error {

	marshalledPostReport := marshalPostReportToDatabase(report)

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	stmt, names := postReportTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		marshalledPostReport,
	)

	stmt, names = postReportsByAccountBucketsTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		marshalledPostReport,
	)

	stmt, names = postReportsByAccountTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		marshalledPostReport,
	)

	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "CreatePostReport")
	}

	if err := r.indexPostReport(ctx, report); err != nil {
		return err
	}

	return nil
}

func (r ReportCassandraElasticsearchRepository) GetPostReportById(ctx context.Context, requester *principal.Principal, postId, accountId string) (*report.PostReport, error) {

	var postRep postReport

	if err := r.session.
		Query(postReportTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postReport{
			PostId:             postId,
			ReportingAccountId: accountId,
		}).
		GetRelease(&postRep); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("post report", postId+"-"+accountId)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "GetPostReportById")
	}

	rep := report.UnmarshalPostReportFromDatabase(
		postRep.PostId,
		postRep.ReportingAccountId,
		postRep.RuleId,
		postRep.CreatedAt,
	)

	if err := rep.CanView(requester); err != nil {
		return nil, err
	}

	return rep, nil
}

func (r ReportCassandraElasticsearchRepository) getPostReportsByAccountBuckets(ctx context.Context, accountId string) ([]int, error) {

	var buckets []postReport

	if err := r.session.Query(postReportsByAccountBucketsTable.Select()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(postReport{
			ReportingAccountId: accountId,
		}).
		SelectRelease(&buckets); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "getPostReportsByAccountBuckets")
	}

	var final []int

	for _, b := range buckets {
		final = append(final, b.Bucket)
	}

	return final, nil
}

func (r ReportCassandraElasticsearchRepository) DeleteAccountData(ctx context.Context, accountId string) error {

	buckets, err := r.getPostReportsByAccountBuckets(ctx, accountId)

	if err != nil {
		return err
	}
	// iterate through all buckets starting from x bucket until we have enough values
	for _, bucketId := range buckets {

		builder := qb.Select(postReportsByAccountTable.Name()).
			Where(qb.Eq("bucket"), qb.Eq("reporting_account_id"))

		var results []*postReport

		if err := builder.
			Query(r.session).
			WithContext(ctx).
			Idempotent(true).
			BindStruct(postReport{Bucket: bucketId, ReportingAccountId: accountId}).
			SelectRelease(&results); err != nil {
			return errors.Wrap(support.NewGocqlError(err), "DeleteAccountData")
		}

		if len(results) == 0 {
			continue
		}

		// batch delete
		batch := r.session.NewBatch(gocql.LoggedBatch)

		for _, postRep := range results {

			stmt, _ := postReportTable.Delete()

			batch.Query(stmt,
				postRep.PostId,
				postRep.ReportingAccountId,
			)

			if err := r.deletePostReportsIndexById(ctx, postRep.PostId, postRep.ReportingAccountId); err != nil {
				return err
			}
		}

		if err := r.session.ExecuteBatch(batch); err != nil {
			return errors.Wrap(support.NewGocqlError(err), "DeleteAccountData: delete post reports")
		}
	}

	// delete all buckets for this account as well
	if err := r.session.Query(qb.
		Delete(postReportsByAccountBucketsTable.Name()).
		Where(qb.Eq("reporting_account_id")).
		ToCql()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(postReport{
			ReportingAccountId: accountId,
		}).
		SelectRelease(&buckets); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "DeleteAccountData: delete post reports by account buckets")
	}

	return nil
}
