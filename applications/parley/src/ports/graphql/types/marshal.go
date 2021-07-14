package types

import (
	"overdoll/applications/parley/src/domain/infraction"
)

func MarshalPendingPostAuditLogToGraphQL(log *infraction.PendingPostAuditLog) *PendingPostAuditLogEdge {

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

		return &PendingPostAuditLogEdge{
			Cursor: log.ID(),
			Node: &PendingPostAuditLog{
				ID:     log.ID(),
				PostID: log.PostId(),
				Contributor: &AuditAccount{
					ID:       log.Contributor().ID(),
					Username: log.Contributor().Username(),
				},
				Moderator: &AuditAccount{
					ID:       log.Moderator().ID(),
					Username: log.Moderator().Username(),
				},
				InfractionID: infractionId,
				Status:       log.Status(),
				Reason:       reason,
				Notes:        log.Notes(),
				Reverted:     log.Reverted(),
				CanRevert:    log.CanRevert(),
			},
		}
	}

	return nil
}
