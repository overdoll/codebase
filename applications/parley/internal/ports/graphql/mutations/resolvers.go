package mutations

import (
	"context"

	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/passport"
)

type MutationResolver struct {
	App *app.Application
}

func (m MutationResolver) ModeratePost(ctx context.Context, input types.ModeratePostInput) (*types.ModeratePostPayload, error) {

	rejectionReasonId := ""

	if input.PostRejectionReasonID != nil {
		rejectionReasonId = input.PostRejectionReasonID.GetID()
	}

	auditLog, err := m.App.Commands.ModeratePost.Handle(ctx, passport.FromContext(ctx).AccountID(), input.PostID.GetID(), rejectionReasonId, input.Notes)

	if err != nil {
		return nil, err
	}

	return &types.ModeratePostPayload{PostAuditLog: types.MarshalPostAuditLogToGraphQL(auditLog)}, nil
}

func (m MutationResolver) RevertPostAuditLog(ctx context.Context, input types.RevertPostAuditLogInput) (*types.RevertPostAuditLogPayload, error) {

	auditLog, err := m.App.Commands.RevertModeratePost.Handle(ctx, passport.FromContext(ctx).AccountID(), input.PostAuditLogID.GetID())

	if err != nil {
		return nil, err
	}

	return &types.RevertPostAuditLogPayload{PostAuditLog: types.MarshalPostAuditLogToGraphQL(auditLog)}, nil
}

func (m MutationResolver) ToggleModeratorSettingsInQueue(ctx context.Context) (*types.ToggleModeratorSettingsInQueuePayload, error) {

	inQueue, err := m.App.Commands.ToggleModerator.Handle(ctx, passport.FromContext(ctx).AccountID())

	if err != nil {
		return nil, err
	}

	return &types.ToggleModeratorSettingsInQueuePayload{ModeratorSettingsInQueue: &inQueue}, nil
}
