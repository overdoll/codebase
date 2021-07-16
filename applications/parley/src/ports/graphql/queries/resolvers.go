package queries

import (
	"context"

	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/ports/graphql/types"
	"overdoll/libraries/graphql"
	"overdoll/libraries/passport"
)

type QueryResolver struct {
	App *app.Application
}

func (q QueryResolver) AccountInfractionHistory(ctx context.Context) ([]*types.AccountInfractionHistory, error) {

	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	history, err := q.App.Queries.AccountInfractionHistory.Handle(ctx, pass.AccountID())

	if err != nil {
		return nil, err
	}

	var infractionHistory []*types.AccountInfractionHistory

	for _, infraction := range history {
		infractionHistory = append(infractionHistory, &types.AccountInfractionHistory{
			ID:     infraction.ID(),
			Reason: infraction.Reason(),
		})
	}

	return infractionHistory, nil
}

func (q QueryResolver) PendingPostAuditLogs(ctx context.Context, after, before *string, first, last *int, filter *types.PendingPostAuditLogFilters) (*types.PendingPostAuditLogConnection, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	moderatorId := ""
	contributorId := ""
	postId := ""
	var dateRange []int

	if filter != nil {
		if filter.ModeratorID != nil {
			moderatorId = *filter.ModeratorID
		}

		if filter.ContributorID != nil {
			contributorId = *filter.ContributorID
		}

		if filter.PostID != nil {
			postId = *filter.PostID
		}

		if filter.DateRange != nil {
			dateRange = filter.DateRange
		}
	}

	input := &graphql.ConnectionInput{
		After:  after,
		Before: before,
		First:  first,
		Last:   last,
	}

	logs, err := q.App.Queries.PendingPostsAuditLogByModerator.Handle(ctx, input.ToCursor(), moderatorId, contributorId, postId, dateRange, pass.AccountID())

	if err != nil {
		return nil, err
	}

	var auditLogs []*types.PendingPostAuditLogEdge

	for _, log := range logs {
		auditLogs = append(auditLogs, types.MarshalPendingPostAuditLogToGraphQL(log))
	}

	return &types.PendingPostAuditLogConnection{Edges: auditLogs, PageInfo: &graphql.PageInfo{
		HasNextPage:     false,
		HasPreviousPage: false,
		StartCursor:     nil,
		EndCursor:       nil,
	}}, nil
}

func (q QueryResolver) RejectionReasons(ctx context.Context) ([]*types.PendingPostRejectionReason, error) {

	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	reasons, err := q.App.Queries.PendingPostRejectionReasons.Handle(ctx)

	if err != nil {
		return nil, err
	}

	var rejectionReasons []*types.PendingPostRejectionReason

	for _, reason := range reasons {
		rejectionReasons = append(rejectionReasons, &types.PendingPostRejectionReason{
			ID:         reason.ID(),
			Reason:     reason.Reason(),
			Infraction: reason.Infraction(),
		})
	}

	return rejectionReasons, nil
}
