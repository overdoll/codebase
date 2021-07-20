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
		"post_id",
		"contributor_account_id",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type postAuditLog struct {
	Id            string `db:"id"`
	Bucket        int    `db:"bucket"`
	CreatedMs     int    `db:"created_ms"`
	PostId        string `db:"post_id"`
	ContributorId string `db:"contributor_account_id"`
	ModeratorId   string `db:"moderator_account_id"`
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
	},
	PartKey: []string{"post_id"},
	SortKey: []string{},
})

type postAuditLogByPost struct {
	Id            string `db:"id"`
	Bucket        int    `db:"bucket"`
	CreatedMs     int    `db:"created_ms"`
	PostId        string `db:"post_id"`
	ContributorId string `db:"contributor_account_id"`
	ModeratorId   string `db:"moderator_account_id"`
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

		"contributor_account_username",
		"moderator_account_username",
		"account_infraction_id",
		"status",
		"reason",
		"notes",
		"reverted",
	},
	PartKey: []string{"moderator_account_id", "bucket"},
	SortKey: []string{"created_ms", "contributor_account_id", "post_id", "id"},
})

type postAuditLogByModerator struct {
	Id            string `db:"id"`
	Bucket        int    `db:"bucket"`
	CreatedMs     int    `db:"created_ms"`
	PostId        string `db:"post_id"`
	ContributorId string `db:"contributor_account_id"`
	ModeratorId   string `db:"moderator_account_id"`

	ContributorUsername string `db:"contributor_account_username"`
	ModeratorUsername   string `db:"moderator_account_username"`
	AccountInfractionId string `db:"account_infraction_id"`
	Status              string `db:"status"`
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
		ModeratorId:         auditLog.Moderator().ID(),
		ModeratorUsername:   auditLog.Moderator().Username(),
		ContributorId:       auditLog.Contributor().ID(),
		ContributorUsername: auditLog.Contributor().Username(),
		AccountInfractionId: userInfractionId,
		Status:              auditLog.Status(),
		Reason:              reason,
		Notes:               auditLog.Notes(),
		Reverted:            auditLog.Reverted(),
		CreatedMs:           auditLog.CreatedMs(),
	}, nil
}

func (r InfractionCassandraRepository) GetPostAuditLogsByPost(ctx context.Context, cursor *paging.Cursor, filters *infraction.PostAuditLogFilters) ([]*infraction.PostAuditLog, *paging.Info, error) {
	panic("implement me")
}

func (r InfractionCassandraRepository) CreatePostAuditLog(ctx context.Context, auditLog *infraction.PostAuditLog) error {

	marshalledAuditLog, err := marshalPostAuditLogToDatabase(auditLog)

	if err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := postAuditLogTable.Insert()

	batch.Query(stmt, marshalledAuditLog.Id, marshalledAuditLog.PostId, marshalledAuditLog.ContributorId, marshalledAuditLog.ModeratorId, marshalledAuditLog.Bucket, marshalledAuditLog.CreatedMs)

	stmt, _ = postAuditLogByPostTable.Insert()

	batch.Query(stmt, marshalledAuditLog.Id, marshalledAuditLog.PostId, marshalledAuditLog.ContributorId, marshalledAuditLog.ModeratorId, marshalledAuditLog.Bucket, marshalledAuditLog.CreatedMs)

	stmt, _ = postAuditLogByModeratorTable.Insert()

	batch.Query(stmt,
		marshalledAuditLog.Id,
		marshalledAuditLog.PostId,
		marshalledAuditLog.CreatedMs,
		marshalledAuditLog.ContributorId,
		marshalledAuditLog.ContributorUsername,
		marshalledAuditLog.ModeratorId,
		marshalledAuditLog.ModeratorUsername,
		marshalledAuditLog.AccountInfractionId,
		marshalledAuditLog.Status,
		marshalledAuditLog.Reason,
		marshalledAuditLog.Notes,
		marshalledAuditLog.Reverted,
		marshalledAuditLog.Bucket,
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
		pendingPostAuditLogByModerator.ModeratorUsername,
		pendingPostAuditLogByModerator.ContributorId,
		pendingPostAuditLogByModerator.ContributorUsername,
		pendingPostAuditLogByModerator.Status,
		pendingPostAuditLogByModerator.AccountInfractionId,
		pendingPostAuditLogByModerator.Reason,
		pendingPostAuditLogByModerator.Notes,
		pendingPostAuditLogByModerator.Reverted,
		userInfractionHistory,
		pendingPostAuditLogByModerator.CreatedMs,
	), nil
}

func (r InfractionCassandraRepository) GetPostAuditLogByModerator(ctx context.Context, cursor *paging.Cursor, filter *infraction.PostAuditLogFilters) ([]*infraction.PostAuditLog, *paging.Info, error) {

	// build query based on filters
	builder :=
		postAuditLogByModeratorTable.SelectBuilder().
			Where(qb.Eq("moderator_account_id"), qb.In("bucket"), qb.Gt("created_ms"))

	if filter.ContributorId() != "" {
		builder.Where(qb.Eq("contributor_account_id"))

		if filter.PostId() != "" {
			builder.Where(qb.Eq("post_id"))
		}
	}

	var times []int

	for _, date := range filter.DateRange() {
		times = append(times, bucket.MakeBucketFromTimestamp(date))
	}

	pendingPostAuditLogQuery := builder.
		Columns(
			"id",
			"post_id",
			"contributor_account_id",
			"contributor_account_username",
			"moderator_account_id",
			"moderator_account_username",
			"account_infraction_id",
			"created_ms",
			"status",
			"reason",
			"notes",
			"reverted",
			"bucket",
		).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindMap(qb.M{
			"bucket": times,
			// in the future created_ms will be used as a cursor for pagination for filtering
			"created_ms":             0,
			"moderator_account_id":   filter.ModeratorId(),
			"contributor_account_id": filter.ContributorId(),
			"post_id":                filter.PostId(),
		})

	var dbPendingPostAuditLogs []*postAuditLogByModerator

	if err := pendingPostAuditLogQuery.Select(&dbPendingPostAuditLogs); err != nil {
		return nil, nil, err
	}

	var pendingPostAuditLogs []*infraction.PostAuditLog

	for _, pendingPostAuditLog := range dbPendingPostAuditLogs {

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
			pendingPostAuditLog.ModeratorUsername,
			pendingPostAuditLog.ContributorId,
			pendingPostAuditLog.ContributorUsername,
			pendingPostAuditLog.Status,
			pendingPostAuditLog.AccountInfractionId,
			pendingPostAuditLog.Reason,
			pendingPostAuditLog.Notes,
			pendingPostAuditLog.Reverted,
			userInfractionHistory,
			pendingPostAuditLog.CreatedMs,
		)

		pendingPostAuditLogs = append(pendingPostAuditLogs, result)
	}

	return pendingPostAuditLogs, nil, nil
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
