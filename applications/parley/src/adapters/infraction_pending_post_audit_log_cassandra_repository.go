package adapters

import (
	"context"
	"fmt"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/parley/src/domain/infraction"
)

type PendingPostAuditLog struct {
	Id                string `db:"id"`
	PostId            string `db:"post_id"`
	ModeratorId       string `db:"moderator_user_id"`
	ModeratorUsername string `db:"moderator_username"`
	Status            string `db:"status"`
	Reason            string `db:"reason"`
	Notes             string `db:"notes"`
	Reverted          bool   `db:"reverted"`
}

func marshalPendingPostAuditLogToDatabase(auditLog *infraction.PendingPostAuditLog) *PendingPostAuditLog {
	return &PendingPostAuditLog{
		Id:                auditLog.ID(),
		PostId:            auditLog.PostId(),
		ModeratorId:       auditLog.Moderator().ID(),
		ModeratorUsername: auditLog.Moderator().Username(),
		Status:            auditLog.Status(),
		Reason:            auditLog.RejectionReason().Reason(),
		Notes:             auditLog.Notes(),
		Reverted:          auditLog.Reverted(),
	}
}

func (r InfractionCassandraRepository) CreatePendingPostAuditLog(ctx context.Context, auditLog *infraction.PendingPostAuditLog) error {

	insertPost := qb.Insert("pending_posts_audit_log").
		Columns(
			"id",
			"post_id",
			"moderator_user_id",
			"moderator_username",
			"status",
			"contributor_user_id",
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

	// if denied with infraction, add to infraction history
	if auditLog.IsDeniedWithInfraction() {
		if err := r.CreateUserInfractionHistory(ctx, auditLog.UserInfraction()); err != nil {
			return err
		}
	}

	return nil
}
