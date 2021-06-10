package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/parley/src/domain/infraction"
)

type PendingPostAuditLog struct {
	Id                  string `db:"id"`
	PostId              string `db:"post_id"`
	ContributorId       string `db:"contributor_user_id"`
	ContributorUsername string `db:"contributor_user_username"`
	ModeratorId         string `db:"moderator_user_id"`
	ModeratorUsername   string `db:"moderator_username"`
	UserInfractionId    string `db:"user_infraction_id"`
	Status              string `db:"status"`
	Reason              string `db:"reason"`
	Notes               string `db:"notes"`
	Reverted            bool   `db:"reverted"`
}

func marshalPendingPostAuditLogToDatabase(auditLog *infraction.PendingPostAuditLog) *PendingPostAuditLog {

	userInfractionId := ""

	if auditLog.IsDeniedWithInfraction() {
		userInfractionId = auditLog.UserInfraction().ID()
	}

	return &PendingPostAuditLog{
		Id:                  auditLog.ID(),
		PostId:              auditLog.PostId(),
		ModeratorId:         auditLog.Moderator().ID(),
		ModeratorUsername:   auditLog.Moderator().Username(),
		ContributorId:       auditLog.Contributor().ID(),
		ContributorUsername: auditLog.Contributor().Username(),
		UserInfractionId:    userInfractionId,
		Status:              auditLog.Status(),
		Reason:              auditLog.RejectionReason().Reason(),
		Notes:               auditLog.Notes(),
		Reverted:            auditLog.Reverted(),
	}
}

func (r InfractionCassandraRepository) CreatePendingPostAuditLog(ctx context.Context, auditLog *infraction.PendingPostAuditLog) error {

	insertPost := qb.Insert("pending_posts_audit_log").
		Columns(
			"id",
			"post_id",
			"contributor_user_id",
			"contributor_user_username",
			"moderator_user_id",
			"moderator_username",
			"user_infraction_id",
			"status",
			"reason",
			"notes",
			"reverted",
		).
		Query(r.session).
		BindStruct(marshalPendingPostAuditLogToDatabase(auditLog)).
		Consistency(gocql.One)

	if err := insertPost.ExecRelease(); err != nil {
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

func (r InfractionCassandraRepository) GetPendingPostAuditLog(ctx context.Context, id string) (*infraction.PendingPostAuditLog, error) {

	pendingPostAuditLogQuery := qb.Select("pending_posts_audit_log").
		Where(qb.Eq("id")).
		Columns(
			"id",
			"post_id",
			"contributor_user_id",
			"contributor_user_username",
			"moderator_user_id",
			"moderator_username",
			"user_infraction_id",
			"status",
			"reason",
			"notes",
			"reverted",
		).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&PendingPostAuditLog{Id: id})

	var pendingPostAuditLog PendingPostAuditLog

	if err := pendingPostAuditLogQuery.Get(&pendingPostAuditLog); err != nil {
		return nil, err
	}

	var userInfractionHistory *infraction.UserInfractionHistory
	var err error

	if pendingPostAuditLog.UserInfractionId != "" {
		userInfractionHistory, err = r.GetUserInfractionHistoryById(ctx, pendingPostAuditLog.UserInfractionId)

		if err != nil {
			return nil, err
		}
	}

	return infraction.UnmarshalPendingPostAuditLogFromDatabase(
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
	), nil
}

func (r InfractionCassandraRepository) GetPendingPostAuditLogByModerator(ctx context.Context, moderatorId string) ([]*infraction.PendingPostAuditLog, error) {

	pendingPostAuditLogQuery := qb.Select("pending_posts_audit_log").
		Where(qb.Eq("moderator_user_id")).
		Columns(
			"id",
			"post_id",
			"contributor_user_id",
			"contributor_user_username",
			"moderator_user_id",
			"moderator_username",
			"user_infraction_id",
			"status",
			"reason",
			"notes",
			"reverted",
		).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&PendingPostAuditLog{ModeratorId: moderatorId})

	var dbPendingPostAuditLogs []*PendingPostAuditLog

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

		//(id, userId, reason string, expiration time.Time)
		pendingPostAuditLogs = append(pendingPostAuditLogs,
			infraction.UnmarshalPendingPostAuditLogFromDatabase(
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
			),
		)
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

	updateAuditLog := qb.Update("pending_posts_audit_log").
		Set(
			"id",
			"post_id",
			"contributor_user_id",
			"contributor_user_username",
			"moderator_user_id",
			"moderator_username",
			"user_infraction_id",
			"status",
			"reason",
			"notes",
			"reverted",
		).
		Where(qb.Eq("id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalPendingPostAuditLogToDatabase(auditLog))

	if err := updateAuditLog.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	return auditLog, nil

}
