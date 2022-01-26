package queries

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/query"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/paging"
)

type QueryResolver struct {
	App *app.Application
}

func (r QueryResolver) Rules(ctx context.Context, after *string, before *string, first *int, last *int, deprecated bool) (*types.RuleConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.Rules.Handle(ctx, query.Rules{
		Cursor:     cursor,
		Deprecated: deprecated,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalRuleToGraphQLConnection(ctx, results, cursor), nil
}
