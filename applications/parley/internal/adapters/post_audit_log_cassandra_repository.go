package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/libraries/bucket"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type postAuditLog struct {
	Id                 string  `db:"id"`
	Bucket             int     `db:"bucket"`
	PostId             string  `db:"post_id"`
	ModeratorAccountId string  `db:"moderator_account_id"`
	Action             string  `db:"action"`
	RuleId             *string `db:"rule_id"`
	Notes              *string `db:"notes"`
}

var postAuditLogTable = table.New(table.Metadata{
	Name: "post_audit_logs",
	Columns: []string{
		"id",
		"bucket",
		"post_id",
		"moderator_account_id",
		"action",
		"rule_id",
		"notes",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

var postAuditLogByPostTable = table.New(table.Metadata{
	Name: "post_audit_logs_by_post",
	Columns: []string{
		"id",
		"bucket",
		"post_id",
		"moderator_account_id",
		"action",
		"rule_id",
		"notes",
	},
	PartKey: []string{"post_id"},
	SortKey: []string{"id"},
})

var postAuditLogByModeratorTable = table.New(table.Metadata{
	Name: "post_audit_logs_by_moderator",
	Columns: []string{
		"id",
		"bucket",
		"post_id",
		"moderator_account_id",
		"action",
		"rule_id",
		"notes",
	},
	PartKey: []string{"moderator_account_id", "bucket"},
	SortKey: []string{"id"},
})

type PostAuditLogCassandraRepository struct {
	session gocqlx.Session
}

func NewPostAuditLogCassandraRepository(session gocqlx.Session) PostAuditLogCassandraRepository {
	return PostAuditLogCassandraRepository{session: session}
}

func marshalPostAuditLogToDatabase(auditLog *post_audit_log.PostAuditLog) (*postAuditLog, error) {

	buck, err := bucket.MakeWeeklyBucketFromUUID(auditLog.ID())

	if err != nil {
		return nil, err
	}

	return &postAuditLog{
		Id:                 auditLog.ID(),
		Bucket:             buck,
		PostId:             auditLog.PostId(),
		ModeratorAccountId: auditLog.ModeratorId(),
		Action:             auditLog.Action().String(),
		RuleId:             auditLog.RuleId(),
		Notes:              auditLog.Notes(),
	}, nil
}

func (r PostAuditLogCassandraRepository) CreatePostAuditLog(ctx context.Context, auditLog *post_audit_log.PostAuditLog) error {

	marshalledAuditLog, err := marshalPostAuditLogToDatabase(auditLog)

	if err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := postAuditLogTable.Insert()

	batch.Query(stmt,
		marshalledAuditLog.Id,
		marshalledAuditLog.Bucket,
		marshalledAuditLog.PostId,
		marshalledAuditLog.ModeratorAccountId,
		marshalledAuditLog.Action,
		marshalledAuditLog.RuleId,
		marshalledAuditLog.Notes,
	)

	stmt, _ = postAuditLogByPostTable.Insert()

	batch.Query(stmt,
		marshalledAuditLog.Id,
		marshalledAuditLog.Bucket,
		marshalledAuditLog.PostId,
		marshalledAuditLog.ModeratorAccountId,
		marshalledAuditLog.Action,
		marshalledAuditLog.RuleId,
		marshalledAuditLog.Notes,
	)

	stmt, _ = postAuditLogByModeratorTable.Insert()

	batch.Query(stmt,
		marshalledAuditLog.Id,
		marshalledAuditLog.Bucket,
		marshalledAuditLog.PostId,
		marshalledAuditLog.ModeratorAccountId,
		marshalledAuditLog.Action,
		marshalledAuditLog.RuleId,
		marshalledAuditLog.Notes,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to create audit log: %v", err)
	}

	return nil
}

func (r PostAuditLogCassandraRepository) getPostAuditLogById(ctx context.Context, logId string) (*post_audit_log.PostAuditLog, error) {

	var postAudit postAuditLog

	if err := r.session.
		Query(postAuditLogTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postAuditLog{
			Id: logId,
		}).
		Get(&postAudit); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post_audit_log.ErrPostAuditLogNotFound
		}

		return nil, fmt.Errorf("failed to get audit log for post: %v", err)
	}

	infractionReason := post_audit_log.UnmarshalPostAuditLogFromDatabase(
		postAudit.Id,
		postAudit.PostId,
		postAudit.ModeratorAccountId,
		postAudit.Action,
		postAudit.RuleId,
		postAudit.Notes,
	)

	return infractionReason, nil
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

func (r PostAuditLogCassandraRepository) SearchPostAuditLogs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post_audit_log.PostAuditLogFilters) ([]*post_audit_log.PostAuditLog, error) {

	var pendingPostAuditLogs []*post_audit_log.PostAuditLog

	if err := post_audit_log.CanViewWithFilters(requester, filter); err != nil {
		return nil, err
	}

	startingBucket := 1
	endingBucket := 0

	if filter.From() != nil {
		startingBucket = bucket.MakeWeeklyBucketFromTimestamp(*filter.From())
	}

	if filter.To() != nil {
		endingBucket = bucket.MakeWeeklyBucketFromTimestamp(*filter.To())
	}

	// iterate through all buckets starting from x bucket until we have enough values
	for bucketId := startingBucket; bucketId >= endingBucket; bucketId-- {

		var builder *qb.SelectBuilder

		info := map[string]interface{}{}

		if filter.ModeratorId() != nil {
			builder = qb.Select(postAuditLogByModeratorTable.Name()).
				Where(qb.Eq("bucket"), qb.Eq("moderator_account_id"))

			info["bucket"] = bucketId
			info["moderator_account_id"] = *filter.ModeratorId()
		}

		if filter.PostId() != nil {
			builder = qb.Select(postAuditLogByPostTable.Name()).
				Where(qb.Eq("post_id"))

			info["post_id"] = *filter.PostId()
		}

		if err := cursor.BuildCassandra(builder, "id", false); err != nil {
			return nil, err
		}

		var results []*postAuditLog

		if err := builder.
			Query(r.session).
			BindMap(info).
			Select(&results); err != nil {
			return nil, fmt.Errorf("failed to search audit logs: %v", err)
		}

		for _, auditLog := range results {

			result := post_audit_log.UnmarshalPostAuditLogFromDatabase(
				auditLog.Id,
				auditLog.PostId,
				auditLog.ModeratorAccountId,
				auditLog.Action,
				auditLog.RuleId,
				auditLog.Notes,
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
