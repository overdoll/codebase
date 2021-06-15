package queries

import (
	"context"

	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
)

type QueryResolver struct {
	App *app.Application
}

func (q QueryResolver) PendingPostAuditLogs(ctx context.Context, input relay.ConnectionInput, filter types.PendingPostAuditLogFilters) (*types.PendingPostAuditLogConnection, error) {
	//pass := passport.FromContext(ctx)
	//
	//if !pass.IsAuthenticated() {
	//	return nil, passport.ErrNotAuthenticated
	//}

	logs, err := q.App.Queries.PendingPostsAuditLog.Handle(ctx, input.ToCursor(), "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	if err != nil {
		return nil, err
	}

	var auditLogs []*types.PendingPostAuditLog

	for _, log := range logs {
		auditLogs = append(auditLogs, types.MarshalPendingPostAuditLogToGraphQL(log))
	}

	return auditLogs, nil
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

//func (p PendingPost) Edger(node *types.PendingPost, offset int) *types.PendingPostEdge {
//	return &types.PendingPostEdge{
//		Node:   node,
//		Cursor: relay.OffsetToCursor(offset),
//	}
//}
//
//func (p PendingPost) ConMaker(edges []*types.PendingPostEdge, info *relay.PageInfo, totalCount int) (*types.PendingPostConnection, error) {
//	return &types.PendingPostConnection{
//		Edges:      edges,
//		PageInfo:   info,
//		TotalCount: totalCount,
//	}, nil
//}
//
//func NodeTypeCon(source []*types.PendingPost, nType PendingPost, input relay.ConnectionInput) (*types.PendingPostConnection, error) {
//	var edges []*types.PendingPostEdge
//	var pageInfo *relay.PageInfo
//
//	emptyCon, _ := nType.ConMaker(edges, pageInfo, 0)
//
//	offset := 0
//
//	if input.After != nil {
//		for i, value := range source {
//			edge := nType.Edger(value, i)
//
//			if edge.GetCursor() == *input.After {
//				// remove all previous element including the "after" one
//				source = source[i+1:]
//				offset = i + 1
//				break
//			}
//		}
//	}
//
//	if input.Before != nil {
//		for i, value := range source {
//			edge := nType.Edger(value, i+offset)
//
//			if edge.GetCursor() == *input.Before {
//				// remove all after element including the "before" one
//				break
//			}
//
//			edges = append(edges, edge)
//		}
//	} else {
//		edges = make([]*types.PendingPostEdge, len(source))
//
//		for i, value := range source {
//			edges[i] = nType.Edger(value, i+offset)
//		}
//	}
//
//	if input.First != nil {
//		if *input.First < 0 {
//			return emptyCon, fmt.Errorf("first less than zero")
//		}
//
//		if len(edges) > *input.First {
//			// Slice result to be of length first by removing edges from the end
//			edges = edges[:*input.First]
//			pageInfo.HasNextPage = true
//		}
//	}
//
//	if input.Last != nil {
//		if *input.Last < 0 {
//			return emptyCon, fmt.Errorf("last less than zero")
//		}
//
//		if len(edges) > *input.Last {
//			// Slice result to be of length last by removing edges from the start
//			edges = edges[len(edges)-*input.Last:]
//			pageInfo.HasPreviousPage = true
//		}
//	}
//
//	return nType.ConMaker(edges, pageInfo, len(source))
//}
