package entities

import (
	"context"

	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

type EntityResolver struct {
	App *app.Application
}

// only moderators can grab audit logs from a pending post
func (r EntityResolver) FindPendingPostByID(ctx context.Context, id relay.ID) (*types.PendingPost, error) {
	panic("implement me")
}

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	return &types.Account{ID: id}, nil
}

func (r EntityResolver) FindAccountInfractionHistoryByID(ctx context.Context, id relay.ID) (*types.AccountInfractionHistory, error) {
	return nil, nil
}

func (r EntityResolver) FindPendingPostAuditLogByID(ctx context.Context, id relay.ID) (*types.PendingPostAuditLog, error) {
	return nil, nil
}

func (r EntityResolver) FindPendingPostRejectionReasonByID(ctx context.Context, id relay.ID) (*types.PendingPostRejectionReason, error) {
	return nil, nil
}
