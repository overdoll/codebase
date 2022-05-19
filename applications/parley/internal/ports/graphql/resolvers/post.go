package resolvers

import (
	"context"
	"overdoll/applications/parley/internal/domain/rule"
	"time"

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

	rep, err := r.App.Queries.PostReportById.Handle(ctx, query.PostReportById{
		Principal: principal.FromContext(ctx),
		AccountId: principal.FromContext(ctx).AccountId(),
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

func (r PostResolver) Reports(ctx context.Context, obj *types.Post, after *string, before *string, first *int, last *int, from time.Time, to *time.Time) (*types.PostReportConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	postId := obj.ID.GetID()

	logs, err := r.App.Queries.SearchPostReports.Handle(ctx, query.SearchPostReports{
		Cursor:    cursor,
		PostId:    &postId,
		Principal: principal.FromContext(ctx),
		From:      from,
		To:        to,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostReportToGraphQLConnection(ctx, logs, cursor), nil
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

	return types.MarshalPostAuditLogToGraphQLConnection(ctx, logs, cursor), nil
}

func (r PostResolver) Rule(ctx context.Context, obj *types.Post) (*types.Rule, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	rl, err := r.App.Queries.RuleByPostId.Handle(ctx, query.RuleByPostId{
		PostId:    obj.ID.GetID(),
		Principal: principal.FromContext(ctx),
	})

	if err != nil {

		if err == rule.ErrRuleNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalRuleToGraphQL(ctx, rl), nil
}
