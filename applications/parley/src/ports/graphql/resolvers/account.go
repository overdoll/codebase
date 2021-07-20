package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
)

type AccountResolver struct {
	App *app.Application
}

func (r AccountResolver) Contributor(ctx context.Context, obj *types.Account) (*types.Contributor, error) {
	return &types.Contributor{ID: obj.ID}, nil
}

func (r AccountResolver) ModeratorPostAuditLogs(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PostAuditLogConnection, error) {

	accountId := obj.ID.GetID()

	if passport.FromContext(ctx).AccountID() != accountId {
		return nil, nil
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	logs, page, err := r.App.Queries.PostsAuditLogByModerator.Handle(ctx, cursor, accountId)

	if err != nil {
		return nil, err
	}

	return types.MarshalPostAuditLogToGraphQLConnection(logs, page), nil
}

func (r AccountResolver) Infractions(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.AccountInfractionHistoryConnection, error) {

	accountId := obj.ID.GetID()

	if passport.FromContext(ctx).AccountID() != accountId {
		return nil, nil
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	history, page, err := r.App.Queries.AccountInfractionHistory.Handle(ctx, cursor, accountId)

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountInfractionHistoryToGraphQLConnection(history, page), nil
}

func (r AccountResolver) Moderator(ctx context.Context, obj *types.Account) (*types.Moderator, error) {

	mod, err := r.App.Queries.ModeratorById.Handle(ctx, obj.ID.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalModeratorToGraphQL(mod), nil
}
