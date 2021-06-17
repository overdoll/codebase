package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/libraries/bucket"
)

type PendingPostAuditLog struct {
	Id            string `db:"id"`
	Bucket        int    `db:"bucket"`
	CreatedMs     int    `db:"created_ms"`
	PostId        string `db:"post_id"`
	ContributorId string `db:"contributor_user_id"`
	ModeratorId   string `db:"moderator_user_id"`
}

type PendingPostAuditLogByPost struct {
	Id            string `db:"id"`
	Bucket        int    `db:"bucket"`
	CreatedMs     int    `db:"created_ms"`
	PostId        string `db:"post_id"`
	ContributorId string `db:"contributor_user_id"`
	ModeratorId   string `db:"moderator_user_id"`
}

type PendingPostAuditLogByModerator struct {
	Id            string `db:"id"`
	Bucket        int    `db:"bucket"`
	CreatedMs     int    `db:"created_ms"`
	PostId        string `db:"post_id"`
	ContributorId string `db:"contributor_user_id"`
	ModeratorId   string `db:"moderator_user_id"`

	ContributorUsername string `db:"contributor_user_username"`
	ModeratorUsername   string `db:"moderator_user_username"`
	UserInfractionId    string `db:"user_infraction_id"`
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
		UserInfractionId:    userInfractionId,
		Status:              auditLog.Status(),
		Reason:              reason,
		Notes:               auditLog.Notes(),
		Reverted:            auditLog.Reverted(),
		CreatedMs:           auditLog.CreatedMs(),
	}, nil
}

func (r InfractionCassandraRepository) CreatePendingPostAuditLog(ctx context.Context, auditLog *infraction.PendingPostAuditLog) error {

	marhsl, err := marshalPendingPostAuditLogToDatabase(auditLog)

	if err != nil {
		return err
	}

	insertPost := qb.Insert("pending_posts_audit_log").
		Columns(
			"id",
			"post_id",
			"contributor_user_id",
			"moderator_user_id",
			"bucket",
			"created_ms",
		).
		Query(r.session).
		BindStruct(marhsl).
		Consistency(gocql.One)

	if err := insertPost.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	insertPostByPost := qb.Insert("pending_posts_audit_logs_by_post").
		Columns(
			"id",
			"post_id",
			"contributor_user_id",
			"moderator_user_id",
			"bucket",
			"created_ms",
		).
		Query(r.session).
		BindStruct(marhsl).
		Consistency(gocql.One)

	if err := insertPostByPost.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	insertPostByModerator := qb.Insert("pending_posts_audit_logs_by_moderator").
		Columns(
			"id",
			"post_id",
			"created_ms",
			"contributor_user_id",
			"contributor_user_username",
			"moderator_user_id",
			"moderator_user_username",
			"user_infraction_id",
			"status",
			"reason",
			"notes",
			"reverted",
			"bucket",
		).
		Query(r.session).
		BindStruct(marhsl).
		Consistency(gocql.One)

	if err := insertPostByModerator.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
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
			"contributor_user_id",
			"moderator_user_id",
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
			qb.Eq("moderator_user_id"),
			qb.Eq("bucket"),
			qb.Eq("contributor_user_id"),
			qb.Eq("post_id"),
			qb.Eq("id"),
			qb.Eq("created_ms"),
		).
		Columns(
			"id",
			"post_id",
			"contributor_user_id",
			"contributor_user_username",
			"moderator_user_id",
			"moderator_user_username",
			"user_infraction_id",
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

	var userInfractionHistory *infraction.UserInfractionHistory
	var err error

	if pendingPostAuditLogByModerator.UserInfractionId != "" {
		userInfractionHistory, err = r.GetUserInfractionHistoryById(
			ctx,
			pendingPostAuditLogByModerator.ContributorId,
			pendingPostAuditLogByModerator.UserInfractionId,
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
		pendingPostAuditLogByModerator.UserInfractionId,
		pendingPostAuditLogByModerator.Reason,
		pendingPostAuditLogByModerator.Notes,
		pendingPostAuditLogByModerator.Reverted,
		userInfractionHistory,
		pendingPostAuditLogByModerator.CreatedMs,
	), nil
}

func (r InfractionCassandraRepository) GetPendingPostAuditLogByModerator(ctx context.Context, filter *infraction.PendingPostAuditLogFilters) ([]*infraction.PendingPostAuditLog, error) {

	// build query based on filters
	builder :=
		qb.Select("pending_posts_audit_logs_by_moderator").
			Where(qb.Eq("moderator_user_id"), qb.In("bucket"), qb.Gt("created_ms"))

	if filter.ContributorId() != "" {
		builder.Where(qb.Eq("contributor_user_id"))

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
			"contributor_user_id",
			"contributor_user_username",
			"moderator_user_id",
			"moderator_user_username",
			"user_infraction_id",
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
			"created_ms":          0,
			"moderator_user_id":   filter.ModeratorId(),
			"contributor_user_id": filter.ContributorId(),
			"post_id":             filter.PostId(),
		})

	var dbPendingPostAuditLogs []*PendingPostAuditLogByModerator

	if err := pendingPostAuditLogQuery.Select(&dbPendingPostAuditLogs); err != nil {
		return nil, err
	}

	var pendingPostAuditLogs []*infraction.PendingPostAuditLog

	for _, pendingPostAuditLog := range dbPendingPostAuditLogs {

		var userInfractionHistory *infraction.UserInfractionHistory

		if pendingPostAuditLog.UserInfractionId != "" {
			userInfractionHistory = infraction.UnmarshalUserInfractionHistoryFromDatabase(
				pendingPostAuditLog.UserInfractionId,
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
			pendingPostAuditLog.UserInfractionId,
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
			qb.Eq("moderator_user_id"),
			qb.Eq("bucket"),
			qb.Eq("created_ms"),
			qb.Eq("contributor_user_id"),
			qb.Eq("post_id"),
			qb.Eq("id"),
		).
		Set(
			"user_infraction_id",
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
