package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/query"
	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type AccountResolver struct {
	App *app.Application
}

func (r AccountResolver) ModeratorPostAuditLogs(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int, dateRange types.PostAuditLogDateRange) (*types.PostAuditLogConnection, error) {

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
		From:               &dateRange.From,
		To:                 &dateRange.To,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostAuditLogToGraphQLConnection(ctx, logs, cursor), nil
}

func (r AccountResolver) Infractions(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.AccountInfractionHistoryConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	history, err := r.App.Queries.AccountInfractionHistory.Handle(ctx, query.AccountInfractionHistory{
		Cursor:    cursor,
		AccountId: obj.ID.GetID(),
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountInfractionHistoryToGraphQLConnection(ctx, history, cursor), nil
}

func (r AccountResolver) Moderator(ctx context.Context, obj *types.Account) (*types.Moderator, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	mod, err := r.App.Queries.ModeratorById.Handle(ctx, query.ModeratorById{
		AccountId: obj.ID.GetID(),
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
