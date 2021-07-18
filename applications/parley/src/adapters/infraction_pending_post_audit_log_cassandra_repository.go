package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/libraries/bucket"
	"overdoll/libraries/paging"
)

type PendingPostAuditLog struct {
	Id            string `db:"id"`
	Bucket        int    `db:"bucket"`
	CreatedMs     int    `db:"created_ms"`
	PostId        string `db:"post_id"`
	ContributorId string `db:"contributor_account_id"`
	ModeratorId   string `db:"moderator_account_id"`
}

type PendingPostAuditLogByPost struct {
	Id            string `db:"id"`
	Bucket        int    `db:"bucket"`
	CreatedMs     int    `db:"created_ms"`
	PostId        string `db:"post_id"`
	ContributorId string `db:"contributor_account_id"`
	ModeratorId   string `db:"moderator_account_id"`
}

type PendingPostAuditLogByModerator struct {
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

func marshalPendingPostAuditLogToDatabase(auditLog *infraction.PendingPostAuditLog) (*PendingPostAuditLogByModerator, error) {

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

	return &PendingPostAuditLogByModerator{
		Id:                  auditLog.ID(),
		Bucket:              buck,
		PostId:              auditLog.PostId(),
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

func (r InfractionCassandraRepository) CreatePendingPostAuditLog(ctx context.Context, auditLog *infraction.PendingPostAuditLog) error {

	marshalledAuditLog, err := marshalPendingPostAuditLogToDatabase(auditLog)

	if err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	q := qb.Insert("pending_posts_audit_log").
		Columns(
			"id",
			"post_id",
			"contributor_account_id",
			"moderator_account_id",
			"bucket",
			"created_ms",
		)

	stmt, _ := q.ToCql()

	batch.Query(stmt, marshalledAuditLog.Id, marshalledAuditLog.PostId, marshalledAuditLog.ContributorId, marshalledAuditLog.ModeratorId, marshalledAuditLog.Bucket, marshalledAuditLog.CreatedMs)

	q = qb.Insert("pending_posts_audit_logs_by_post").
		Columns(
			"id",
			"post_id",
			"contributor_account_id",
			"moderator_account_id",
			"bucket",
			"created_ms",
		)

	stmt, _ = q.ToCql()

	batch.Query(stmt, marshalledAuditLog.Id, marshalledAuditLog.PostId, marshalledAuditLog.ContributorId, marshalledAuditLog.ModeratorId, marshalledAuditLog.Bucket, marshalledAuditLog.CreatedMs)

	q = qb.Insert("pending_posts_audit_logs_by_moderator").
		Columns(
			"id",
			"post_id",
			"created_ms",
			"contributor_account_id",
			"contributor_account_username",
			"moderator_account_id",
			"moderator_account_username",
			"account_infraction_id",
			"status",
			"reason",
			"notes",
			"reverted",
			"bucket",
		)

	stmt, _ = q.ToCql()

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
		if err := r.CreateUserInfractionHistory(ctx, auditLog.UserInfraction()); err != nil {
			return err
		}
	}

	return nil
}

func (r InfractionCassandraRepository) GetPendingPostAuditLog(ctx context.Context, logId string) (*infraction.PendingPostAuditLog, error) {

	// grab the pending post audit log to get all of the composite keys
	pendingPostAuditLogQuery := qb.Select("pending_posts_audit_log").
		Where(qb.Eq("id")).
		Columns(
			"id",
			"bucket",
			"post_id",
			"contributor_account_id",
			"moderator_account_id",
			"created_ms",
		).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&PendingPostAuditLog{
			Id: logId,
		})

	var pendingPostAuditLog PendingPostAuditLog

	if err := pendingPostAuditLogQuery.Get(&pendingPostAuditLog); err != nil {
		return nil, err
	}

	pendingPostAuditLogByModeratorQuery := qb.Select("pending_posts_audit_logs_by_moderator").
		Where(
			qb.Eq("moderator_account_id"),
			qb.Eq("bucket"),
			qb.Eq("contributor_account_id"),
			qb.Eq("post_id"),
			qb.Eq("id"),
			qb.Eq("created_ms"),
		).
		Columns(
			"id",
			"post_id",
			"contributor_account_id",
			"contributor_account_username",
			"moderator_account_id",
			"moderator_account_username",
			"account_infraction_id",
			"status",
			"reason",
			"notes",
			"reverted",
			"bucket",
			"created_ms",
		).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&pendingPostAuditLog)

	var pendingPostAuditLogByModerator PendingPostAuditLogByModerator

	if err := pendingPostAuditLogByModeratorQuery.Get(&pendingPostAuditLogByModerator); err != nil {
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

	return infraction.UnmarshalPendingPostAuditLogFromDatabase(
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

func (r InfractionCassandraRepository) GetPendingPostAuditLogByModerator(ctx context.Context, cursor *paging.Cursor, filter *infraction.PendingPostAuditLogFilters) ([]*infraction.PendingPostAuditLog, error) {

	// build query based on filters
	builder :=
		qb.Select("pending_posts_audit_logs_by_moderator").
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

	var dbPendingPostAuditLogs []*PendingPostAuditLogByModerator

	if err := pendingPostAuditLogQuery.Select(&dbPendingPostAuditLogs); err != nil {
		return nil, err
	}

	var pendingPostAuditLogs []*infraction.PendingPostAuditLog

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

		result := infraction.UnmarshalPendingPostAuditLogFromDatabase(
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

	return pendingPostAuditLogs, nil
}

func (r InfractionCassandraRepository) UpdatePendingPostAuditLog(ctx context.Context, id string, updateFn func(auditLog *infraction.PendingPostAuditLog) error) (*infraction.PendingPostAuditLog, error) {

	auditLog, err := r.GetPendingPostAuditLog(ctx, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(auditLog)

	if err != nil {
		return nil, err
	}

	marhs, err := marshalPendingPostAuditLogToDatabase(auditLog)

	if err != nil {
		return nil, err
	}

	updateAuditLog := qb.Update("pending_posts_audit_logs_by_moderator").
		Where(
			qb.Eq("moderator_account_id"),
			qb.Eq("bucket"),
			qb.Eq("created_ms"),
			qb.Eq("contributor_account_id"),
			qb.Eq("post_id"),
			qb.Eq("id"),
		).
		Set(
			"account_infraction_id",
			"reverted",
			"reason",
		).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(marhs)

	if err := updateAuditLog.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	return auditLog, nil

}
