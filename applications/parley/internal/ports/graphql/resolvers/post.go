package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/query"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type PostResolver struct {
	App *app.Application
}

func (r PostResolver) ViewerReport(ctx context.Context, obj *types.Post) (*types.PostReport, error) {

	// if not authenticated, just send nil since we dont want to error out
	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, nil
	}

	rep, err := r.App.Queries.PostReportByAccountAndPost.Handle(ctx, query.PostReportByAccountAndPost{
		Principal: principal.FromContext(ctx),
		PostId:    obj.ID.GetID(),
	})

	if err != nil {

		if err == report.ErrPostReportNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalPostReportToGraphQL(ctx, rep), nil
}

func (r PostResolver) Reports(ctx context.Context, obj *types.Post, after *string, before *string, first *int, last *int, dateRange types.PostReportDateRange) (*types.PostReportConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	logs, err := r.App.Queries.SearchPostReports.Handle(ctx, query.SearchPostReports{
		Cursor:    cursor,
		PostId:    obj.ID.GetID(),
		Principal: principal.FromContext(ctx),
		From:      dateRange.From,
		To:        dateRange.To,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostReportToGraphQLConnection(ctx, logs, cursor), nil
}

func (r PostResolver) AuditLogs(ctx context.Context, obj *types.Post, after *string, before *string, first *int, last *int, dateRange types.PostAuditLogDateRange) (*types.PostAuditLogConnection, error) {

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
		From:      dateRange.From,
		To:        dateRange.To,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostAuditLogToGraphQLConnection(ctx, logs, cursor), nil
}
