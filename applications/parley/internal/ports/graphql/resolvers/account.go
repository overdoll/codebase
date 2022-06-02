package resolvers

import (
	"context"
	"overdoll/libraries/errors/domainerror"
	"time"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/query"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type AccountResolver struct {
	App *app.Application
}

func (r AccountResolver) PostAuditLogs(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int, from time.Time, to *time.Time) (*types.PostAuditLogConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	id := obj.ID.GetID()

	logs, err := r.App.Queries.SearchPostAuditLogs.Handle(ctx, query.SearchPostAuditLogs{
		Cursor:             cursor,
		ModeratorAccountId: &id,
		Principal:          principal.FromContext(ctx),
		From:               &from,
		To:                 to,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostAuditLogToGraphQLConnection(ctx, logs, cursor), nil
}

func (r AccountResolver) ModeratorSettings(ctx context.Context, obj *types.Account) (*types.ModeratorSettings, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	mod, err := r.App.Queries.ModeratorById.Handle(ctx, query.ModeratorById{
		AccountId: obj.ID.GetID(),
		Principal: principal.FromContext(ctx),
	})

	if err != nil && !domainerror.IsNotFoundError(err) {
		return nil, err
	}

	return types.MarshalModeratorSettingsToGraphQL(mod), nil
}

func (r AccountResolver) PostModeratorQueue(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PostModeratorConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	posts, err := r.App.Queries.SearchPostModeratorQueue.Handle(ctx, query.SearchPostModeratorQueue{
		Cursor:    cursor,
		AccountId: obj.ID.GetID(),
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostModeratorQueueToGraphQLConnection(ctx, posts, cursor), nil
}
