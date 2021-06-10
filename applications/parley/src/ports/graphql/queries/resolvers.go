package queries

import (
	"context"

	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/ports/graphql/types"
	"overdoll/libraries/passport"
)

type QueryResolver struct {
	App *app.Application
}

func (q QueryResolver) RejectionReasons(ctx context.Context) ([]*types.PendingPostRejectionReason, error) {

	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	reasons, err := q.App.Queries.PendingPostRejectionReasons.Handle(ctx)

	if err != nil {
		return nil, err
	}

	var rejectionReasons []*types.PendingPostRejectionReason

	for _, reason := range reasons {
		rejectionReasons = append(rejectionReasons, &types.PendingPostRejectionReason{
			ID:         reason.ID(),
			Reason:     reason.Reason(),
			Infraction: reason.Infraction(),
		})
	}

	return rejectionReasons, nil
}

func (q QueryResolver) PendingPostAuditLogs(ctx context.Context, data types.PendingPostAuditLogInput) ([]*types.PendingPostAuditLog, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	logs, err := q.App.Queries.PendingPostsAuditLog.Handle(ctx, pass.UserID(), data.ModeratorID)

	if err != nil {
		return nil, err
	}

	var auditLogs []*types.PendingPostAuditLog

	for _, log := range logs {

		var infractionId *string

		if log.IsDeniedWithInfraction() {
			id := log.UserInfraction().ID()
			infractionId = &id
		}

		auditLogs = append(auditLogs, &types.PendingPostAuditLog{
			ID:     log.ID(),
			PostID: log.PostId(),
			Contributor: &types.User{
				ID:       log.Contributor().ID(),
				Username: log.Contributor().Username(),
			},
			Moderator: &types.User{
				ID:       log.Moderator().ID(),
				Username: log.Moderator().Username(),
			},
			InfractionID: infractionId,
			Status:       log.Status(),
			Reason:       log.RejectionReason().Reason(),
			Notes:        log.Notes(),
			Reverted:     log.Reverted(),
		})
	}

	return auditLogs, nil
}
