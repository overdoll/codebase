package mutations

import (
	"context"

	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/command"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/passport"
)

type MutationResolver struct {
	App *app.Application
}

func (m MutationResolver) ModeratePost(ctx context.Context, input types.ModeratePostInput) (*types.ModeratePostPayload, error) {

	var rejectionReasonId *string

	if input.PostRejectionReasonID != nil {
		id := input.PostRejectionReasonID.GetID()
		rejectionReasonId = &id
	}

	auditLog, err := m.App.Commands.ModeratePost.Handle(ctx, command.ModeratePost{
		ModeratorAccountId:    passport.FromContext(ctx).AccountID(),
		PostId:                input.PostID.GetID(),
		PostRejectionReasonId: rejectionReasonId,
		Notes:                 input.Notes,
	})

	if err != nil {
		return nil, err
	}

	return &types.ModeratePostPayload{PostAuditLog: types.MarshalPostAuditLogToGraphQL(auditLog)}, nil
}

func (m MutationResolver) RevertPostAuditLog(ctx context.Context, input types.RevertPostAuditLogInput) (*types.RevertPostAuditLogPayload, error) {

	auditLog, err := m.App.Commands.RevertModeratePost.Handle(ctx, command.RevertModeratePost{
		ModeratorAccountId: passport.FromContext(ctx).AccountID(),
		AuditLogId:         input.PostAuditLogID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return &types.RevertPostAuditLogPayload{PostAuditLog: types.MarshalPostAuditLogToGraphQL(auditLog)}, nil
}

func (m MutationResolver) ToggleModeratorSettingsInQueue(ctx context.Context) (*types.ToggleModeratorSettingsInQueuePayload, error) {

	inQueue, err := m.App.Commands.ToggleModerator.Handle(ctx, command.ToggleModerator{
		AccountId: passport.FromContext(ctx).AccountID(),
	})

	if err != nil {
		return nil, err
	}

	return &types.ToggleModeratorSettingsInQueuePayload{ModeratorSettingsInQueue: &inQueue}, nil
}
