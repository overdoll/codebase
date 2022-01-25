package types

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/libraries/passport"

	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/applications/parley/internal/domain/moderator"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
)

func MarshalPostAuditLogToGraphQL(ctx context.Context, result *post_audit_log.PostAuditLog) *PostAuditLog {

	var reason *PostRejectionReason

	if result.RejectionReason() != nil {
		reason = MarshalPostRejectionReasonToGraphQL(ctx, result.RejectionReason())
	}

	var action PostAuditLogAction

	if result.IsDenied() {
		action = PostAuditLogActionDenied
	}

	if result.IsApproved() {
		action = PostAuditLogActionApproved
	}

	if result.IsRemoved() {
		action = PostAuditLogActionRemoved
	}

	return &PostAuditLog{
		ID:                  relay.NewID(PostAuditLog{}, result.PostID(), result.ID()),
		Contributor:         &Account{ID: relay.NewID(Account{}, result.ContributorId())},
		Moderator:           &Account{ID: relay.NewID(Account{}, result.ModeratorId())},
		Action:              action,
		PostRejectionReason: reason,
		Notes:               result.Notes(),
		Post:                &Post{ID: relay.NewID(Post{}, result.PostID())},
	}
}

func MarshalPostAuditLogToGraphQLConnection(ctx context.Context, results []*post_audit_log.PostAuditLog, cursor *paging.Cursor) *PostAuditLogConnection {

	var auditLogs []*PostAuditLogEdge

	conn := &PostAuditLogConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: auditLogs,
	}

	limit := cursor.GetLimit()

	if len(results) == 0 {
		return conn
	}

	if len(results) == limit {
		conn.PageInfo.HasNextPage = cursor.First() != nil
		conn.PageInfo.HasPreviousPage = cursor.Last() != nil
		results = results[:len(results)-1]
	}

	var nodeAt func(int) *post_audit_log.PostAuditLog

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *post_audit_log.PostAuditLog {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *post_audit_log.PostAuditLog {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		auditLogs = append(auditLogs, &PostAuditLogEdge{
			Node:   MarshalPostAuditLogToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = auditLogs

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalPostReportToGraphQL(ctx context.Context, result *report.PostReport) *PostReport {
	return &PostReport{
		ID:               relay.NewID(PostReport{}, result.PostID(), result.ID()),
		Account:          &Account{ID: relay.NewID(Account{}, result.ReportingAccountId())},
		PostReportReason: MarshalPostReportReasonToGraphQL(ctx, result.ReportReason()),
	}
}

func MarshalPostReportToGraphQLConnection(ctx context.Context, results []*report.PostReport, cursor *paging.Cursor) *PostReportConnection {

	var postReports []*PostReportEdge

	conn := &PostReportConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: postReports,
	}

	limit := cursor.GetLimit()

	if len(results) == 0 {
		return conn
	}

	if len(results) == limit {
		conn.PageInfo.HasNextPage = cursor.First() != nil
		conn.PageInfo.HasPreviousPage = cursor.Last() != nil
		results = results[:len(results)-1]
	}

	var nodeAt func(int) *report.PostReport

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *report.PostReport {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *report.PostReport {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		postReports = append(postReports, &PostReportEdge{
			Node:   MarshalPostReportToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = postReports

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalAccountInfractionHistoryToGraphQL(ctx context.Context, result *club_infraction.ClubInfraction) *AccountInfractionHistory {
	return &AccountInfractionHistory{
		ID:                  relay.NewID(AccountInfractionHistory{}, result.AccountId(), result.ID()),
		PostRejectionReason: MarshalPostRejectionReasonToGraphQL(ctx, result.Reason()),
	}
}

func MarshalPostReportReasonToGraphQL(ctx context.Context, result *report.PostReportReason) *PostReportReason {
	return &PostReportReason{
		ID:     relay.NewID(AccountInfractionHistory{}, result.ID()),
		Reason: result.Reason().Translate(passport.FromContext(ctx).Language(), result.ID()),
	}
}

func MarshalPostReportReasonToGraphQLConnection(ctx context.Context, results []*report.PostReportReason, cursor *paging.Cursor) *PostReportReasonConnection {

	var reportReasons []*PostReportReasonEdge

	conn := &PostReportReasonConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: reportReasons,
	}

	limit := cursor.GetLimit()

	if len(results) == 0 {
		return conn
	}

	if len(results) == limit {
		conn.PageInfo.HasNextPage = cursor.First() != nil
		conn.PageInfo.HasPreviousPage = cursor.Last() != nil
		results = results[:len(results)-1]
	}

	var nodeAt func(int) *report.PostReportReason

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *report.PostReportReason {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *report.PostReportReason {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		reportReasons = append(reportReasons, &PostReportReasonEdge{
			Node:   MarshalPostReportReasonToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = reportReasons

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalAccountInfractionHistoryToGraphQLConnection(ctx context.Context, results []*club_infraction.ClubInfraction, cursor *paging.Cursor) *AccountInfractionHistoryConnection {

	var infractionHistory []*AccountInfractionHistoryEdge

	conn := &AccountInfractionHistoryConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: infractionHistory,
	}

	limit := cursor.GetLimit()

	if len(results) == 0 {
		return conn
	}

	if len(results) == limit {
		conn.PageInfo.HasNextPage = cursor.First() != nil
		conn.PageInfo.HasPreviousPage = cursor.Last() != nil
		results = results[:len(results)-1]
	}

	var nodeAt func(int) *club_infraction.ClubInfraction

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *club_infraction.ClubInfraction {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *club_infraction.ClubInfraction {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		infractionHistory = append(infractionHistory, &AccountInfractionHistoryEdge{
			Node:   MarshalAccountInfractionHistoryToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = infractionHistory

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalModeratorSettingsToGraphQL(result *moderator.Moderator) *ModeratorSettings {

	if result == nil {
		return &ModeratorSettings{IsInModeratorQueue: false}
	}

	time := result.LastSelected()

	return &ModeratorSettings{
		IsInModeratorQueue: true,
		LastSelected:       &time,
	}
}

func MarshalPostRejectionReasonToGraphQL(ctx context.Context, result *post_audit_log.PostRejectionReason) *PostRejectionReason {
	return &PostRejectionReason{
		ID:         relay.NewID(PostRejectionReason{}, result.ID()),
		Reason:     result.Reason().Translate(passport.FromContext(ctx).Language(), result.ID()),
		Infraction: result.InfractionId(),
	}
}

func MarshalPostRejectionReasonToGraphQLConnection(ctx context.Context, results []*post_audit_log.PostRejectionReason, cursor *paging.Cursor) *PostRejectionReasonConnection {

	var rejectionReasons []*PostRejectionReasonEdge

	conn := &PostRejectionReasonConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: rejectionReasons,
	}

	limit := cursor.GetLimit()

	if len(results) == 0 {
		return conn
	}

	if len(results) == limit {
		conn.PageInfo.HasNextPage = cursor.First() != nil
		conn.PageInfo.HasPreviousPage = cursor.Last() != nil
		results = results[:len(results)-1]
	}

	var nodeAt func(int) *post_audit_log.PostRejectionReason

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *post_audit_log.PostRejectionReason {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *post_audit_log.PostRejectionReason {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		rejectionReasons = append(rejectionReasons, &PostRejectionReasonEdge{
			Node:   MarshalPostRejectionReasonToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = rejectionReasons

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}
