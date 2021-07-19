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

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	panic("implement me")
}

func (r EntityResolver) FindAccountInfractionHistoryByID(ctx context.Context, id relay.ID) (*types.AccountInfractionHistory, error) {
	panic("implement me")
}

func (r EntityResolver) FindPostAuditLogByID(ctx context.Context, id relay.ID) (*types.PostAuditLog, error) {
	panic("implement me")
}

func (r EntityResolver) FindPostRejectionReasonByID(ctx context.Context, id relay.ID) (*types.PostRejectionReason, error) {
	panic("implement me")
}

func (r EntityResolver) FindPostByID(ctx context.Context, id relay.ID) (*types.Post, error) {
	_, err := r.App.Queries.GetPendingPostAuditLogById.Handle(ctx, id.GetID())

	if err != nil {
		return nil, err
	}

	return &types.Post{
		ID:        id,
		AuditLogs: nil,
	}, nil
}
