package adapters

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/libraries/paging"
	"overdoll/libraries/paging/paging_drivers"
)

type PendingPostAuditLog struct {
	Id                  string `db:"id"`
	PostId              string `db:"post_id"`
	ContributorId       string `db:"contributor_user_id"`
	ContributorUsername string `db:"contributor_user_username"`
	ModeratorId         string `db:"moderator_user_id"`
	ModeratorUsername   string `db:"moderator_user_username"`
	UserInfractionId    string `db:"user_infraction_id"`
	Status              string `db:"status"`
	Reason              string `db:"reason"`
	Notes               string `db:"notes"`
	Reverted            bool   `db:"reverted"`
}

func marshalPendingPostAuditLogToDatabase(auditLog *infraction.PendingPostAuditLog) *PendingPostAuditLog {

	userInfractionId := ""
	reason := ""

	if auditLog.IsDeniedWithInfraction() {
		userInfractionId = auditLog.UserInfraction().ID()
	}

	if auditLog.IsDenied() {
		reason = auditLog.RejectionReason().Reason()
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
		Reason:              reason,
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
			"moderator_user_username",
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

func (r InfractionCassandraRepository) GetPendingPostAuditLog(ctx context.Context, moderatorId, logId string) (*infraction.PendingPostAuditLog, error) {

	pendingPostAuditLogQuery := qb.Select("pending_posts_audit_log").
		Where(qb.Eq("moderator_user_id"), qb.Eq("id")).
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
		).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&PendingPostAuditLog{Id: logId, ModeratorId: moderatorId})

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
		// ID is made up of moderator ID + the audit Log ID, so we give both to get precise querying
		pendingPostAuditLog.ModeratorId+"+"+pendingPostAuditLog.Id+"+",
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

func (r InfractionCassandraRepository) GetPendingPostAuditLogByModerator(ctx context.Context, input *paging.Cursor, moderatorId string) (*infraction.PendingPostAuditLogConnection, error) {

	pendingPostAuditLogQuery := qb.Select("pending_posts_audit_log").
		Where(qb.Eq("moderator_user_id"), paging_drivers.TokenCassandra(input)).
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
		).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&PendingPostAuditLog{ModeratorId: moderatorId})

	var dbPendingPostAuditLogs []*PendingPostAuditLog

	state, err := paging_drivers.PageCassandra(input, pendingPostAuditLogQuery, func(iter *gocqlx.Iterx) error {
		return pendingPostAuditLogQuery.Select(&dbPendingPostAuditLogs)
	})

	if err != nil {
		return nil, err
	}

	var pendingPostAuditLogs []*infraction.PendingPostAuditLogEdge

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
			// ID is made up of moderator ID + the audit Log ID, so we give both to get precise querying
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
		)

		//(id, userId, reason string, expiration time.Time)
		pendingPostAuditLogs = append(pendingPostAuditLogs,
			&infraction.PendingPostAuditLogEdge{
				Cursor: pendingPostAuditLog.ModeratorId + "+" + pendingPostAuditLog.ContributorId + "+" + pendingPostAuditLog.Id,
				Node:   result,
			},
		)
	}

	return &infraction.PendingPostAuditLogConnection{
		Edges:    pendingPostAuditLogs,
		PageInfo: paging.NewPageInfo(state.HasMore()),
	}, nil
}

func (r InfractionCassandraRepository) UpdatePendingPostAuditLog(ctx context.Context, id string, updateFn func(auditLog *infraction.PendingPostAuditLog) error) (*infraction.PendingPostAuditLog, error) {
	newId := strings.Split(id, "+")

	auditLog, err := r.GetPendingPostAuditLog(ctx, newId[0], newId[0])

	if err != nil {
		return nil, err
	}

	err = updateFn(auditLog)

	if err != nil {
		return nil, err
	}

	updateAuditLog := qb.Update("pending_posts_audit_log").
		Set(
			"post_id",
			"contributor_user_id",
			"contributor_user_username",
			"user_infraction_id",
			"status",
			"reason",
			"notes",
			"reverted",
		).
		Where(qb.Eq("moderator_user_id"), qb.Eq("id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalPendingPostAuditLogToDatabase(auditLog))

	if err := updateAuditLog.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	return auditLog, nil

}
