package types

import (
	"overdoll/applications/parley/src/domain/infraction"
)

func MarshalPendingPostAuditLogToGraphQL(log *infraction.PendingPostAuditLog) *PendingPostAuditLog {
	if log != nil {
		var infractionId *string

		if log.IsDeniedWithInfraction() {
			id := log.UserInfraction().ID()
			infractionId = &id
		}

		reason := ""

		if log.IsDenied() {
			reason = log.RejectionReason().Reason()
		}

		return &PendingPostAuditLog{
			ID:     log.ID(),
			PostID: log.PostId(),
			Contributor: &AuditUser{
				ID:       log.Contributor().ID(),
				Username: log.Contributor().Username(),
			},
			Moderator: &AuditUser{
				ID:       log.Moderator().ID(),
				Username: log.Moderator().Username(),
			},
			InfractionID: infractionId,
			Status:       log.Status(),
			Reason:       reason,
			Notes:        log.Notes(),
			Reverted:     log.Reverted(),
		}
	}

	return nil
}
