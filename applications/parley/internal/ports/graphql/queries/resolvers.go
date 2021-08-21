package queries

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

type QueryResolver struct {
	App *app.Application
}

func (r QueryResolver) PostReportReasons(ctx context.Context, after *string, before *string, first *int, last *int) (*types.PostReportReasonConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.PostReportReasons.Handle(ctx, query.PostsReportReasons{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostReportReasonToGraphQLConnection(results, cursor), nil
}

func (r QueryResolver) PostRejectionReasons(ctx context.Context, after *string, before *string, first *int, last *int) (*types.PostRejectionReasonConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.PostRejectionReasons.Handle(ctx, query.PostsRejectionReasons{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostRejectionReasonToGraphQLConnection(results, cursor), nil
}
