package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/ports/graphql/types"
	"overdoll/libraries/paging"
)

type PostResolver struct {
	App *app.Application
}

func (r PostResolver) AuditLogs(ctx context.Context, obj *types.Post, after *string, before *string, first *int, last *int) (*types.PostAuditLogConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	logs, page, err := r.App.Queries.SearchPostAuditLogs.Handle(ctx, cursor, "", obj.ID.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalPostAuditLogToGraphQLConnection(logs, cursor, page), nil
}
