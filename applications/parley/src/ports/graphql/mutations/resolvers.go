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

	if err := m.App.Commands.ModeratePost.Handle(ctx, pass.UserID(), data.PendingPostID, rejectionReasonId, data.Notes); err != nil {
		return nil, err
	}

	return &types.ModeratePost{Validation: nil}, nil
}

func (m MutationResolver) RevertPendingPostAuditLog(ctx context.Context, data types.RevertPostInput) (*types.ModeratePost, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	if err := m.App.Commands.RevertModeratePost.Handle(ctx, pass.UserID(), data.AuditLogID); err != nil {
		return nil, err
	}

	return &types.ModeratePost{Validation: nil}, nil
}
