package entities

import (
	"context"

	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/query"
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

func (r EntityResolver) FindClubByID(ctx context.Context, id relay.ID) (*types.Club, error) {
	return &types.Club{ID: id}, nil
}

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	return &types.Account{ID: id}, nil
}

func (r EntityResolver) FindRuleByID(ctx context.Context, id relay.ID) (*types.Rule, error) {

	rule, err := r.App.Queries.RuleById.Handle(ctx, query.RuleById{
		RuleId: id.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalRuleToGraphQL(ctx, rule), nil
}

func (r EntityResolver) FindClubInfractionHistoryByID(ctx context.Context, id relay.ID) (*types.ClubInfractionHistory, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	infractionHistory, err := r.App.Queries.ClubInfractionHistoryById.Handle(ctx, query.ClubInfractionHistoryById{
		ClubId:       id.GetCompositePartID(1),
		InfractionId: id.GetCompositePartID(0),
		Principal:    principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubInfractionHistoryToGraphQL(ctx, infractionHistory), nil
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
		return nil, err
	}

	return types.MarshalPostAuditLogToGraphQL(ctx, auditLog), nil
}

func (r EntityResolver) FindPostReportByID(ctx context.Context, id relay.ID) (*types.PostReport, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	mod, err := r.App.Queries.PostReportById.Handle(ctx, query.PostReportById{
		Principal: principal.FromContext(ctx),
		AccountId: id.GetCompositePartID(0),
		PostId:    id.GetCompositePartID(1),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostReportToGraphQL(ctx, mod), nil
}
