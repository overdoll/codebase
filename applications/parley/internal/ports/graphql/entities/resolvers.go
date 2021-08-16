package entities

import (
	"context"

	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/query"
	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
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

func (r EntityResolver) FindAccountInfractionHistoryByID(ctx context.Context, id relay.ID) (*types.AccountInfractionHistory, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	infractionHistory, err := r.App.Queries.AccountInfractionHistoryById.Handle(ctx, query.AccountInfractionHistoryById{
		AccountId:    id.GetCompositePartID(1),
		InfractionId: id.GetCompositePartID(0),
		Principal:    principal.FromContext(ctx),
	})

	if err != nil {

		if err == infraction.ErrAccountInfractionHistoryNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAccountInfractionHistoryToGraphQL(infractionHistory), nil
}

func (r EntityResolver) FindPostAuditLogByID(ctx context.Context, id relay.ID) (*types.PostAuditLog, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	auditLog, err := r.App.Queries.PostAuditLogById.Handle(ctx, query.PostAuditLogById{
		AuditLogId: id.GetID(),
		Principal:  principal.FromContext(ctx),
	})

	if err != nil {

		if err == infraction.ErrPostAuditLogNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalPostAuditLogToGraphQL(auditLog), nil
}

func (r EntityResolver) FindPostRejectionReasonByID(ctx context.Context, id relay.ID) (*types.PostRejectionReason, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	rejectionReason, err := r.App.Queries.PostRejectionReasonById.Handle(ctx, query.PostRejectionReasonById{
		RejectionReasonId: id.GetID(),
		Principal:         principal.FromContext(ctx),
	})

	if err != nil {

		if err == infraction.ErrPostRejectionReasonNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalPostRejectionReasonToGraphQL(rejectionReason), nil
}

func (r EntityResolver) FindModeratorByID(ctx context.Context, id relay.ID) (*types.Moderator, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	mod, err := r.App.Queries.ModeratorById.Handle(ctx, query.ModeratorById{
		AccountId: id.GetID(),
		Principal: principal.FromContext(ctx),
	})

	if err != nil {

		if err == infraction.ErrInvalidModerator {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalModeratorToGraphQL(mod), nil
}
