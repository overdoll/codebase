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

func (r EntityResolver) FindPostByID(ctx context.Context, id relay.ID) (*types.Post, error) {
	return &types.Post{ID: id}, nil
}

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	return &types.Account{ID: id}, nil
}

func (r EntityResolver) FindContributorByID(ctx context.Context, id relay.ID) (*types.Contributor, error) {
	return &types.Contributor{ID: id}, nil
}

func (r EntityResolver) FindAccountInfractionHistoryByID(ctx context.Context, id relay.ID) (*types.AccountInfractionHistory, error) {

	infractionHistory, err := r.App.Queries.AccountInfractionHistoryById.Handle(ctx, id.GetCompositePartID(1), id.GetCompositePartID(0))

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountInfractionHistoryToGraphQL(infractionHistory), nil
}

func (r EntityResolver) FindPostAuditLogByID(ctx context.Context, id relay.ID) (*types.PostAuditLog, error) {

	auditLog, err := r.App.Queries.PostAuditLogById.Handle(ctx, id.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalPostAuditLogToGraphQL(auditLog), nil
}

func (r EntityResolver) FindPostRejectionReasonByID(ctx context.Context, id relay.ID) (*types.PostRejectionReason, error) {

	rejectionReason, err := r.App.Queries.PostRejectionReasonById.Handle(ctx, id.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalPostRejectionReasonToGraphQL(rejectionReason), nil
}

func (r EntityResolver) FindModeratorByID(ctx context.Context, id relay.ID) (*types.Moderator, error) {

	mod, err := r.App.Queries.ModeratorById.Handle(ctx, id.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalModeratorToGraphQL(mod), nil
}
