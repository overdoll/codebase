package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/query"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type PostResolver struct {
	App *app.Application
}

func (r PostResolver) AuditLogs(ctx context.Context, obj *types.Post, after *string, before *string, first *int, last *int) (*types.PostAuditLogConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	id := obj.ID.GetID()

	logs, err := r.App.Queries.SearchPostAuditLogs.Handle(ctx, query.SearchPostAuditLogs{
		Cursor:    cursor,
		PostId:    &id,
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostAuditLogToGraphQLConnection(logs, cursor), nil
}
