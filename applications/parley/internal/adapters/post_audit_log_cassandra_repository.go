package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/libraries/bucket"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
	"time"
)

type postRule struct {
	PostId string `db:"post_id"`
	RuleId string `db:"rule_id"`
}

var postRuleTable = table.New(table.Metadata{
	Name: "post_rules",
	Columns: []string{
		"post_id",
		"rule_id",
	},
	PartKey: []string{"post_id"},
	SortKey: []string{},
})

type postAuditLog struct {
	Id                 string    `db:"id"`
	Bucket             int       `db:"bucket"`
	PostId             string    `db:"post_id"`
	ModeratorAccountId string    `db:"moderator_account_id"`
	Action             string    `db:"action"`
	RuleId             *string   `db:"rule_id"`
	Notes              *string   `db:"notes"`
	CreatedAt          time.Time `db:"created_at"`
}

var auditLogColumns = []string{
	"id",
	"bucket",
	"post_id",
	"moderator_account_id",
	"action",
	"rule_id",
	"notes",
	"created_at",
}

var postAuditLogTable = table.New(table.Metadata{
	Name:    "post_audit_logs",
	Columns: auditLogColumns,
	PartKey: []string{"id"},
	SortKey: []string{},
})

var postAuditLogByPostTable = table.New(table.Metadata{
	Name:    "post_audit_logs_by_post",
	Columns: auditLogColumns,
	PartKey: []string{"post_id"},
	SortKey: []string{"id"},
})

var postAuditLogByModeratorTable = table.New(table.Metadata{
	Name:    "post_audit_logs_by_moderator",
	Columns: auditLogColumns,
	PartKey: []string{"moderator_account_id", "bucket"},
	SortKey: []string{"id"},
})

var postAuditLogByModeratorBucketsTable = table.New(table.Metadata{
	Name: "post_audit_logs_by_moderator_buckets",
	Columns: []string{
		"moderator_account_id",
		"bucket",
	},
	PartKey: []string{"moderator_account_id"},
	SortKey: []string{"bucket"},
})

type postAuditLogBucket struct {
	Bucket             int    `db:"bucket"`
	ModeratorAccountId string `db:"moderator_account_id"`
}

type PostAuditLogCassandraRepository struct {
	session gocqlx.Session
}

func NewPostAuditLogCassandraRepository(session gocqlx.Session) PostAuditLogCassandraRepository {
	return PostAuditLogCassandraRepository{session: session}
}

func marshalPostAuditLogToDatabase(auditLog *post_audit_log.PostAuditLog) *postAuditLog {
	return &postAuditLog{
		Id:                 auditLog.ID(),
		Bucket:             bucket.MakeWeeklyBucketFromTimestamp(auditLog.CreatedAt()),
		PostId:             auditLog.PostId(),
		ModeratorAccountId: auditLog.ModeratorId(),
		Action:             auditLog.Action().String(),
		RuleId:             auditLog.RuleId(),
		Notes:              auditLog.Notes(),
		CreatedAt:          auditLog.CreatedAt(),
	}
}

func (r PostAuditLogCassandraRepository) CreatePostAuditLog(ctx context.Context, auditLog *post_audit_log.PostAuditLog) error {

	marshalledAuditLog := marshalPostAuditLogToDatabase(auditLog)

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	stmt, names := postAuditLogTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		marshalledAuditLog,
	)

	stmt, names = postAuditLogByPostTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		marshalledAuditLog,
	)

	stmt, names = postAuditLogByModeratorTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		marshalledAuditLog,
	)

	stmt, names = postAuditLogByModeratorBucketsTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		marshalledAuditLog,
	)

	if marshalledAuditLog.RuleId != nil {
		stmt, names = postRuleTable.Insert()
		support.BindStructToBatchStatement(
			batch,
			stmt, names,
			postRule{
				PostId: marshalledAuditLog.PostId,
				RuleId: *marshalledAuditLog.RuleId,
			},
		)
	}

	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "CreatePostAuditLog failed")
	}

	return nil
}

func (r PostAuditLogCassandraRepository) getPostAuditLogById(ctx context.Context, logId string) (*post_audit_log.PostAuditLog, error) {

	var postAudit postAuditLog

	if err := r.session.
		Query(postAuditLogTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postAuditLog{
			Id: logId,
		}).
		GetRelease(&postAudit); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("post audit log", logId)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "getPostAuditLogById failed")
	}

	return post_audit_log.UnmarshalPostAuditLogFromDatabase(
		postAudit.Id,
		postAudit.PostId,
		postAudit.ModeratorAccountId,
		postAudit.Action,
		postAudit.RuleId,
		postAudit.Notes,
		postAudit.CreatedAt,
	), nil
}

func (r PostAuditLogCassandraRepository) GetPostAuditLogByIdOperator(ctx context.Context, logId string) (*post_audit_log.PostAuditLog, error) {
	return r.getPostAuditLogById(ctx, logId)
}

func (r PostAuditLogCassandraRepository) GetPostAuditLogById(ctx context.Context, requester *principal.Principal, logId string) (*post_audit_log.PostAuditLog, error) {
	auditLog, err := r.getPostAuditLogById(ctx, logId)

	if err != nil {
		return nil, err
	}

	if err := auditLog.CanView(requester); err != nil {
		return nil, err
	}

	return auditLog, nil
}

func (r PostAuditLogCassandraRepository) GetRuleIdForPost(ctx context.Context, requester *principal.Principal, postId string) (*string, error) {

	var postR postRule

	if err := r.session.
		Query(postRuleTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postRule{
			PostId: postId,
		}).
		GetRelease(&postR); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("post rule", postId)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "GetRuleIdForPost")
	}

	return &postR.RuleId, nil
}

func (r PostAuditLogCassandraRepository) getPostAuditLogBucketsForAccount(ctx context.Context, accountId string) ([]int, error) {

	var buckets []postAuditLogBucket

	if err := r.session.Query(postAuditLogByModeratorBucketsTable.Select()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(postAuditLogBucket{
			ModeratorAccountId: accountId,
		}).
		SelectRelease(&buckets); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "getPostAuditLogBucketsForAccount")
	}

	var final []int

	for _, b := range buckets {
		final = append(final, b.Bucket)
	}

	return final, nil
}

func (r PostAuditLogCassandraRepository) SearchPostAuditLogs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post_audit_log.PostAuditLogFilters) ([]*post_audit_log.PostAuditLog, error) {

	var pendingPostAuditLogs []*post_audit_log.PostAuditLog

	if err := post_audit_log.CanViewWithFilters(requester, filter); err != nil {
		return nil, err
	}

	// only filter by post
	if filter.PostId() != nil {

		builder := qb.Select(postAuditLogByPostTable.Name()).
			Where(qb.Eq("post_id"))

		if err := cursor.BuildCassandra(builder, "id", false); err != nil {
			return nil, err
		}

		var results []*postAuditLog

		if err := builder.
			Query(r.session).
			WithContext(ctx).
			Idempotent(true).
			BindStruct(postAuditLog{PostId: *filter.PostId()}).
			SelectRelease(&results); err != nil {
			return nil, errors.Wrap(support.NewGocqlError(err), "SearchPostAuditLogs")
		}

		for _, auditLog := range results {

			result := post_audit_log.UnmarshalPostAuditLogFromDatabase(
				auditLog.Id,
				auditLog.PostId,
				auditLog.ModeratorAccountId,
				auditLog.Action,
				auditLog.RuleId,
				auditLog.Notes,
				auditLog.CreatedAt,
			)

			result.Node = paging.NewNode(auditLog.Id)
			pendingPostAuditLogs = append(pendingPostAuditLogs, result)
		}

		return pendingPostAuditLogs, nil
	}

	if filter.ModeratorId() == nil {
		return nil, domainerror.NewValidation("must select either post or moderator for filtering")
	}

	buckets, err := r.getPostAuditLogBucketsForAccount(ctx, *filter.ModeratorId())

	if err != nil {
		return nil, err
	}

	// iterate through all buckets starting from x bucket until we have enough values
	for _, bucketId := range buckets {

		if filter.From() != nil {
			if bucketId < bucket.MakeWeeklyBucketFromTimestamp(*filter.From()) {
				continue
			}
		}

		if filter.To() != nil {
			if bucketId > bucket.MakeWeeklyBucketFromTimestamp(*filter.To()) {
				continue
			}
		}

		builder := qb.Select(postAuditLogByModeratorTable.Name()).
			Where(qb.Eq("bucket"), qb.Eq("moderator_account_id"))

		if err := cursor.BuildCassandra(builder, "id", false); err != nil {
			return nil, err
		}

		var results []*postAuditLog

		if err := builder.
			Query(r.session).
			WithContext(ctx).
			Idempotent(true).
			BindStruct(postAuditLog{Bucket: bucketId, ModeratorAccountId: *filter.ModeratorId()}).
			SelectRelease(&results); err != nil {
			return nil, errors.Wrap(support.NewGocqlError(err), "SearchPostAuditLogs")
		}

		for _, auditLog := range results {

			result := post_audit_log.UnmarshalPostAuditLogFromDatabase(
				auditLog.Id,
				auditLog.PostId,
				auditLog.ModeratorAccountId,
				auditLog.Action,
				auditLog.RuleId,
				auditLog.Notes,
				auditLog.CreatedAt,
			)

			result.Node = paging.NewNode(auditLog.Id)
			pendingPostAuditLogs = append(pendingPostAuditLogs, result)
		}

		if len(pendingPostAuditLogs) >= cursor.GetLimit() {
			break
		}
	}

	return pendingPostAuditLogs, nil
}
