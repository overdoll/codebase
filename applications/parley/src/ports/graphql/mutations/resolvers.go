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

func (m MutationResolver) ModeratePost(ctx context.Context, data types.ModeratePostInput) (*types.ModeratePost, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	rejectionReasonId := ""

	if data.RejectionReasonID != nil {
		rejectionReasonId = *data.RejectionReasonID
	}

	auditLog, err := m.App.Commands.ModeratePost.Handle(ctx, pass.AccountID(), data.PendingPostID, rejectionReasonId, data.Notes)

	if err != nil {
		return nil, err
	}

	return &types.ModeratePost{Validation: nil, AuditLog: types.MarshalPendingPostAuditLogToGraphQL(auditLog).Node}, nil
}

func (m MutationResolver) RevertPendingPostAuditLog(ctx context.Context, data types.RevertPostInput) (*types.ModeratePost, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	auditLog, err := m.App.Commands.RevertModeratePost.Handle(ctx, pass.AccountID(), data.AuditLogID)

	if err != nil {
		return nil, err
	}

	return &types.ModeratePost{Validation: nil, AuditLog: types.MarshalPendingPostAuditLogToGraphQL(auditLog).Node}, nil
}
