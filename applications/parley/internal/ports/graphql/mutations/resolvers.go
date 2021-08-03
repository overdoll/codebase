package mutations

import (
	"context"

	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/command"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type MutationResolver struct {
	App *app.Application
}

func (m MutationResolver) ModeratePost(ctx context.Context, input types.ModeratePostInput) (*types.ModeratePostPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	var rejectionReasonId *string

	if input.PostRejectionReasonID != nil {
		id := input.PostRejectionReasonID.GetID()
		rejectionReasonId = &id
	}

	auditLog, err := m.App.Commands.ModeratePost.Handle(ctx, command.ModeratePost{
		Principal:             principal.FromContext(ctx),
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

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	auditLog, err := m.App.Commands.RevertModeratePost.Handle(ctx, command.RevertModeratePost{
		Principal:  principal.FromContext(ctx),
		AuditLogId: input.PostAuditLogID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return &types.RevertPostAuditLogPayload{PostAuditLog: types.MarshalPostAuditLogToGraphQL(auditLog)}, nil
}

func (m MutationResolver) ToggleModeratorSettingsInQueue(ctx context.Context) (*types.ToggleModeratorSettingsInQueuePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	inQueue, err := m.App.Commands.ToggleModerator.Handle(ctx, command.ToggleModerator{
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return &types.ToggleModeratorSettingsInQueuePayload{ModeratorSettingsInQueue: &inQueue}, nil
}
