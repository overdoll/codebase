package queries

import (
	"context"

	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/ports/graphql/types"
	"overdoll/libraries/passport"
)

type QueryResolver struct {
	App *app.Application
}

func (q QueryResolver) PendingPostAuditLogs(ctx context.Context, filter types.PendingPostAuditLogFilters) (*types.PendingPostAuditLogConnection, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	moderatorId := ""

	if filter.ModeratorID != nil {
		moderatorId = *filter.ModeratorID
	}

	contributorId := ""

	if filter.ContributorID != nil {
		contributorId = *filter.ContributorID
	}

	postId := ""

	if filter.PostID != nil {
		postId = *filter.PostID
	}

	var dateRange []int

	if filter.DateRange != nil {
		dateRange = filter.DateRange
	}

	logs, err := q.App.Queries.PendingPostsAuditLogByModerator.Handle(ctx, moderatorId, contributorId, postId, dateRange, pass.UserID())

	if err != nil {
		return nil, err
	}

	var auditLogs []*types.PendingPostAuditLogEdge

	for _, log := range logs {
		auditLogs = append(auditLogs, types.MarshalPendingPostAuditLogToGraphQL(log))
	}

	return &types.PendingPostAuditLogConnection{Edges: auditLogs}, nil
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
