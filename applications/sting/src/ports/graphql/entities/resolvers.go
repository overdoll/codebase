package entities

import (
	"context"

	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

type EntityResolver struct {
	App *app.Application
}

func (r EntityResolver) FindPendingPostAuditLogByID(ctx context.Context, id relay.ID) (*types.PendingPostAuditLog, error) {

	// We know part of the ID of the audit log is the pending post ID, so we get it here
	// since we dont keep the reference of audit logs
	pendingPost, err := r.App.Queries.GetPendingPost.Handle(ctx, id.GetCompositePartID(1))

	if err != nil {
		return nil, err
	}

	return &types.PendingPostAuditLog{
		ID:          id,
		PendingPost: types.MarshalPendingPostToGraphQL(pendingPost),
	}, nil
}

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	return &types.Account{
		ID: id,
	}, nil
}
