package resolvers

import (
	"context"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/query"
	"overdoll/applications/parley/internal/ports/graphql/types"
)

type PostReport struct {
	App *app.Application
}

func (r PostReport) Rule(ctx context.Context, obj *types.PostReport) (*types.Rule, error) {

	if obj.Rule == nil {
		return nil, nil
	}

	rule, err := r.App.Queries.RuleById.Handle(ctx, query.RuleById{
		RuleId: obj.Rule.ID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalRuleToGraphQL(ctx, rule), nil
}
