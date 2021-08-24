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

func (m MutationResolver) ReportPost(ctx context.Context, input types.ReportPostInput) (*types.ReportPostPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	postReport, err := m.App.Commands.ReportPost.Handle(ctx, command.ReportPost{
		Principal:          principal.FromContext(ctx),
		PostId:             input.PostID.GetID(),
		PostReportReasonId: input.PostReportReason.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return &types.ReportPostPayload{PostReport: types.MarshalPostReportToGraphQL(ctx, postReport)}, nil
}

func (m MutationResolver) RejectPost(ctx context.Context, input types.RejectPostInput) (*types.RejectPostPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	auditLog, err := m.App.Commands.RejectPost.Handle(ctx, command.RejectPost{
		Principal:             principal.FromContext(ctx),
		PostId:                input.PostID.GetID(),
		PostRejectionReasonId: input.PostRejectionReasonID.GetID(),
		Notes:                 input.Notes,
	})

	if err != nil {
		return nil, err
	}

	return &types.RejectPostPayload{PostAuditLog: types.MarshalPostAuditLogToGraphQL(ctx, auditLog)}, nil
}

func (m MutationResolver) RemovePost(ctx context.Context, input types.RemovePostInput) (*types.RemovePostPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	auditLog, err := m.App.Commands.RemovePost.Handle(ctx, command.RemovePost{
		Principal:             principal.FromContext(ctx),
		PostRejectionReasonId: input.PostRejectionReasonID.GetID(),
		Notes:                 input.Notes,
		PostId:                input.PostID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return &types.RemovePostPayload{PostAuditLog: types.MarshalPostAuditLogToGraphQL(ctx, auditLog)}, nil
}

func (m MutationResolver) ApprovePost(ctx context.Context, input types.ApprovePostInput) (*types.ApprovePostPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	auditLog, err := m.App.Commands.ApprovePost.Handle(ctx, command.ApprovePost{
		Principal: principal.FromContext(ctx),
		PostId:    input.PostID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return &types.ApprovePostPayload{PostAuditLog: types.MarshalPostAuditLogToGraphQL(ctx, auditLog)}, nil
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

	return &types.RevertPostAuditLogPayload{PostAuditLog: types.MarshalPostAuditLogToGraphQL(ctx, auditLog)}, nil
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
