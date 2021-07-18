package mutations

import (
	"context"

	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/ports/graphql/types"
	"overdoll/libraries/passport"
)

type MutationResolver struct {
	App *app.Application
}

func (m MutationResolver) ModeratePendingPost(ctx context.Context, input types.ModeratePendingPostInput) (*types.ModeratePendingPostPayload, error) {

	rejectionReasonId := ""

	if input.PendingPostRejectionReasonID != nil {
		rejectionReasonId = input.PendingPostRejectionReasonID.GetID()
	}

	auditLog, err := m.App.Commands.ModeratePost.Handle(ctx, passport.FromContext(ctx).AccountID(), input.PendingPostID.GetID(), rejectionReasonId, input.Notes)

	if err != nil {
		return nil, err
	}

	return &types.ModeratePendingPostPayload{PendingPostAuditLog: types.MarshalPendingPostAuditLogToGraphQL(auditLog)}, nil
}

func (m MutationResolver) RevertPendingPostAuditLog(ctx context.Context, data types.RevertPendingPostAuditLogInput) (*types.RevertPendingPostAuditLogPayload, error) {

	auditLog, err := m.App.Commands.RevertModeratePost.Handle(ctx, passport.FromContext(ctx).AccountID(), data.PendingPostAuditLogID.GetID())

	if err != nil {
		return nil, err
	}

	return &types.RevertPendingPostAuditLogPayload{PendingPostAuditLog: types.MarshalPendingPostAuditLogToGraphQL(auditLog)}, nil
}

func (m MutationResolver) ToggleModeratorSettingsInQueue(ctx context.Context) (*types.ToggleModeratorSettingsInQueuePayload, error) {

	inQueue, err := m.App.Commands.ToggleModerator.Handle(ctx, passport.FromContext(ctx).AccountID())

	if err != nil {
		return nil, err
	}

	return &types.ToggleModeratorSettingsInQueuePayload{ModeratorSettingsInQueue: &inQueue}, nil
}
