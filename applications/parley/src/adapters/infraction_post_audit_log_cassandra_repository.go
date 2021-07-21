package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/libraries/bucket"
	"overdoll/libraries/paging"
)

var postAuditLogTable = table.New(table.Metadata{
	Name: "post_audit_logs",
	Columns: []string{
		"id",
		"moderator_account_id",
		"bucket",
		"created_ms",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type postAuditLog struct {
	Id          string `db:"id"`
	Bucket      int    `db:"bucket"`
	CreatedMs   int    `db:"created_ms"`
	ModeratorId string `db:"moderator_account_id"`
}

var postAuditLogByPostTable = table.New(table.Metadata{
	Name: "post_audit_logs_by_post",
	Columns: []string{
		"id",
		"moderator_account_id",
		"bucket",
		"created_ms",
		"post_id",
		"contributor_account_id",
		"account_infraction_id",
		"action",
		"reason",
		"notes",
		"reverted",
	},
	PartKey: []string{"post_id"},
	SortKey: []string{"created_ms"},
})

type postAuditLogByPost struct {
	Id                  string `db:"id"`
	Bucket              int    `db:"bucket"`
	CreatedMs           int    `db:"created_ms"`
	PostId              string `db:"post_id"`
	ContributorId       string `db:"contributor_account_id"`
	ModeratorId         string `db:"moderator_account_id"`
	AccountInfractionId string `db:"account_infraction_id"`
	Action              string `db:"action"`
	Reason              string `db:"reason"`
	Notes               string `db:"notes"`
	Reverted            bool   `db:"reverted"`
}

var postAuditLogByModeratorTable = table.New(table.Metadata{
	Name: "post_audit_logs_by_moderator",
	Columns: []string{
		"id",
		"moderator_account_id",
		"bucket",
		"created_ms",
		"post_id",
		"contributor_account_id",
		"account_infraction_id",
		"action",
		"reason",
		"notes",
		"reverted",
	},
	PartKey: []string{"moderator_account_id", "bucket"},
	SortKey: []string{"created_ms", "id"},
})

type postAuditLogByModerator struct {
	Id                  string `db:"id"`
	Bucket              int    `db:"bucket"`
	CreatedMs           int    `db:"created_ms"`
	PostId              string `db:"post_id"`
	ContributorId       string `db:"contributor_account_id"`
	ModeratorId         string `db:"moderator_account_id"`
	AccountInfractionId string `db:"account_infraction_id"`
	Action              string `db:"action"`
	Reason              string `db:"reason"`
	Notes               string `db:"notes"`
	Reverted            bool   `db:"reverted"`
}

func marshalPostAuditLogToDatabase(auditLog *infraction.PostAuditLog) (*postAuditLogByModerator, error) {

	userInfractionId := ""
	reason := ""

	if auditLog.IsDeniedWithInfraction() {
		userInfractionId = auditLog.UserInfraction().ID()
	}

	if auditLog.IsDenied() {
		reason = auditLog.RejectionReason().Reason()
	}

	buck, err := bucket.MakeBucketFromKSUID(auditLog.ID())

	if err != nil {
		return nil, err
	}

	return &postAuditLogByModerator{
		Id:                  auditLog.ID(),
		Bucket:              buck,
		PostId:              auditLog.PendingPostID(),
		ModeratorId:         auditLog.ModeratorId(),
		ContributorId:       auditLog.ContributorId(),
		AccountInfractionId: userInfractionId,
		Action:              auditLog.Status(),
		Reason:              reason,
		Notes:               auditLog.Notes(),
		Reverted:            auditLog.Reverted(),
		CreatedMs:           auditLog.CreatedMs(),
	}, nil
}

func (r InfractionCassandraRepository) CreatePostAuditLog(ctx context.Context, auditLog *infraction.PostAuditLog) error {

	marshalledAuditLog, err := marshalPostAuditLogToDatabase(auditLog)

	if err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := postAuditLogTable.Insert()

	batch.Query(stmt,
		marshalledAuditLog.Id,
		marshalledAuditLog.ModeratorId,
		marshalledAuditLog.Bucket,
		marshalledAuditLog.CreatedMs,
	)

	stmt, _ = postAuditLogByPostTable.Insert()

	batch.Query(stmt,
		marshalledAuditLog.Id,
		marshalledAuditLog.PostId,
		marshalledAuditLog.ContributorId,
		marshalledAuditLog.ModeratorId,
		marshalledAuditLog.Bucket,
		marshalledAuditLog.CreatedMs,
	)

	stmt, _ = postAuditLogByModeratorTable.Insert()

	batch.Query(stmt,
		marshalledAuditLog.Id,
		marshalledAuditLog.ModeratorId,
		marshalledAuditLog.Bucket,
		marshalledAuditLog.CreatedMs,
		marshalledAuditLog.PostId,
		marshalledAuditLog.ContributorId,
		marshalledAuditLog.AccountInfractionId,
		marshalledAuditLog.Action,
		marshalledAuditLog.Reason,
		marshalledAuditLog.Notes,
		marshalledAuditLog.Reverted,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return err
	}

	// if denied with infraction, add to infraction history for this user
	if auditLog.IsDeniedWithInfraction() {
		if err := r.CreateAccountInfractionHistory(ctx, auditLog.UserInfraction()); err != nil {
			return err
		}
	}

	return nil
}

func (r InfractionCassandraRepository) GetPostAuditLog(ctx context.Context, logId string) (*infraction.PostAuditLog, error) {

	// grab the pending post audit log to get all of the composite keys
	postAuditLogQuery := r.session.
		Query(postAuditLogTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postAuditLog{
			Id: logId,
		})

	var postAuditLog postAuditLog

	if err := postAuditLogQuery.Get(&postAuditLog); err != nil {
		return nil, err
	}

	postAuditLogByModeratorQuery := r.session.
		Query(postAuditLogByModeratorTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(postAuditLog)

	var pendingPostAuditLogByModerator postAuditLogByModerator

	if err := postAuditLogByModeratorQuery.Get(&pendingPostAuditLogByModerator); err != nil {
		return nil, err
	}

	// grab the final audit log, which is stored in the moderator spot

	var userInfractionHistory *infraction.AccountInfractionHistory
	var err error

	if pendingPostAuditLogByModerator.AccountInfractionId != "" {
		userInfractionHistory, err = r.GetAccountInfractionHistoryById(
			ctx,
			pendingPostAuditLogByModerator.ContributorId,
			pendingPostAuditLogByModerator.AccountInfractionId,
		)

		if err != nil {
			return nil, err
		}
	}

	return infraction.UnmarshalPostAuditLogFromDatabase(
		pendingPostAuditLogByModerator.Id,
		pendingPostAuditLogByModerator.PostId,
		pendingPostAuditLogByModerator.ModeratorId,
		pendingPostAuditLogByModerator.ContributorId,
		pendingPostAuditLogByModerator.Action,
		pendingPostAuditLogByModerator.AccountInfractionId,
		pendingPostAuditLogByModerator.Reason,
		pendingPostAuditLogByModerator.Notes,
		pendingPostAuditLogByModerator.Reverted,
		userInfractionHistory,
		pendingPostAuditLogByModerator.CreatedMs,
	), nil
}

func (r InfractionCassandraRepository) SearchPostAuditLogs(ctx context.Context, cursor *paging.Cursor, filter *infraction.PostAuditLogFilters) ([]*infraction.PostAuditLog, *paging.Info, error) {

	var err error
	if cursor == nil {
		cursor, err = paging.NewCursor(nil, nil, nil, nil)
		if err != nil {
			return nil, nil, err
		}
	}

	times := []int{bucket.MakeBucketFromTimestamp(time.Now())}
	createdMs := time.Now().Unix()

	// FORWARDS PAGING, CHECK IF THERE IS A NEXT PAGE
	var auditLogs []*infraction.PostAuditLog

	builder := postAuditLogByModeratorTable.
		SelectBuilder()

	info := qb.M{
		"bucket": times,
		// in the future created_ms will be used as a cursor for pagination for filtering
		"created_ms":           createdMs,
		"moderator_account_id": filter.ModeratorId(),
	}

	hasNextPage := false
	hasPrevPage := false

	if cursor.First() != nil && *cursor.First() == 0 || cursor.Last() != nil && *cursor.Last() == 0 {
		// asked for empty (0)
		var count int

		if err := builder.
			CountAll().
			Query(r.session).
			Bind(info).
			Select(&count); err != nil {
			return nil, nil, err
		}

		return auditLogs, paging.NewPaging(cursor.First() != nil && count > 0, cursor.Last() != nil && count > 0), nil
	}

	if cursor.After() != nil {
		builder.Where(qb.GtLit("created_ms", *cursor.After()))
	}

	if cursor.Before() != nil {
		builder.Where(qb.LtLit("created_ms", *cursor.Before()))
	}

	if cursor.Last() != nil {
		builder.OrderBy("created_ms", qb.DESC)
	} else {
		builder.OrderBy("created_ms", qb.ASC)
	}

	var limit int

	if cursor.First() != nil {
		limit = *cursor.First() + 1
	} else if cursor.Last() != nil {
		limit = *cursor.Last() + 1
	}

	if limit > 0 {
		builder.Limit(uint(limit))
	}

	var results []*postAuditLogByModerator

	if err := builder.
		Query(r.session).
		Bind(info).
		Select(&results); err != nil {
		return nil, nil, err
	}

	if len(results) == 0 {
		return auditLogs, paging.NewPaging(false, false), nil
	}

	if len(results) == limit {
		hasNextPage = cursor.First() != nil
		hasPrevPage = cursor.Last() != nil
	}

	var pendingPostAuditLogs []*infraction.PostAuditLog

	for _, pendingPostAuditLog := range results {

		var userInfractionHistory *infraction.AccountInfractionHistory

		if pendingPostAuditLog.AccountInfractionId != "" {
			userInfractionHistory = infraction.UnmarshalAccountInfractionHistoryFromDatabase(
				pendingPostAuditLog.AccountInfractionId,
				pendingPostAuditLog.ContributorId,
				pendingPostAuditLog.Reason,
				time.Now(),
			)
		}

		result := infraction.UnmarshalPostAuditLogFromDatabase(
			pendingPostAuditLog.Id,
			pendingPostAuditLog.PostId,
			pendingPostAuditLog.ModeratorId,
			pendingPostAuditLog.ContributorId,
			pendingPostAuditLog.Action,
			pendingPostAuditLog.AccountInfractionId,
			pendingPostAuditLog.Reason,
			pendingPostAuditLog.Notes,
			pendingPostAuditLog.Reverted,
			userInfractionHistory,
			pendingPostAuditLog.CreatedMs,
		)

		result.Node = paging.NewNode(string(rune(pendingPostAuditLog.CreatedMs)))

		pendingPostAuditLogs = append(pendingPostAuditLogs, result)
	}

	return pendingPostAuditLogs, paging.NewPaging(hasNextPage, hasPrevPage), nil
}

func (r InfractionCassandraRepository) UpdatePostAuditLog(ctx context.Context, id string, updateFn func(auditLog *infraction.PostAuditLog) error) (*infraction.PostAuditLog, error) {

	auditLog, err := r.GetPostAuditLog(ctx, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(auditLog)

	if err != nil {
		return nil, err
	}

	marhs, err := marshalPostAuditLogToDatabase(auditLog)

	if err != nil {
		return nil, err
	}

	updateAuditLog := r.session.
		Query(postAuditLogByModeratorTable.Update("account_infraction_id", "reverted", "reason")).
		Consistency(gocql.LocalQuorum).
		BindStruct(marhs)

	if err := updateAuditLog.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	return auditLog, nil

}
