package types

import (
	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/applications/parley/internal/domain/moderator"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
)

func MarshalPostAuditLogToGraphQL(result *infraction.PostAuditLog) *PostAuditLog {

	var reason *PostRejectionReason

	if result.RejectionReason() != nil {
		reason = MarshalPostRejectionReasonToGraphQL(result.RejectionReason())
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
		Reverted:            result.Reverted(),
		ReversibleUntil:     result.ReversibleUntil(),
		Post:                &Post{ID: relay.NewID(Post{}, result.PostID())},
	}
}

func MarshalPostAuditLogToGraphQLConnection(results []*infraction.PostAuditLog, cursor *paging.Cursor) *PostAuditLogConnection {

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

	var nodeAt func(int) *infraction.PostAuditLog

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *infraction.PostAuditLog {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *infraction.PostAuditLog {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		auditLogs = append(auditLogs, &PostAuditLogEdge{
			Node:   MarshalPostAuditLogToGraphQL(node),
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

func MarshalPostReportToGraphQL(result *report.PostReport) *PostReport {
	return &PostReport{
		ID:               relay.NewID(PostReport{}, result.PostID(), result.ID()),
		Account:          &Account{ID: relay.NewID(Account{}, result.ReportingAccountId())},
		PostReportReason: MarshalPostReportReasonToGraphQL(result.ReportReason()),
	}
}

func MarshalPostReportToGraphQLConnection(results []*report.PostReport, cursor *paging.Cursor) *PostReportConnection {

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
			Node:   MarshalPostReportToGraphQL(node),
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

func MarshalAccountInfractionHistoryToGraphQL(result *infraction.AccountInfractionHistory) *AccountInfractionHistory {
	return &AccountInfractionHistory{
		ID:                  relay.NewID(AccountInfractionHistory{}, result.AccountId(), result.ID()),
		PostRejectionReason: MarshalPostRejectionReasonToGraphQL(result.Reason()),
	}
}

func MarshalPostReportReasonToGraphQL(result *report.PostReportReason) *PostReportReason {
	return &PostReportReason{
		ID:     relay.NewID(AccountInfractionHistory{}, result.ID()),
		Reason: result.ID(),
	}
}

func MarshalPostReportReasonToGraphQLConnection(results []*report.PostReportReason, cursor *paging.Cursor) *PostReportReasonConnection {

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
			Node:   MarshalPostReportReasonToGraphQL(node),
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

func MarshalAccountInfractionHistoryToGraphQLConnection(results []*infraction.AccountInfractionHistory, cursor *paging.Cursor) *AccountInfractionHistoryConnection {

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

	var nodeAt func(int) *infraction.AccountInfractionHistory

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *infraction.AccountInfractionHistory {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *infraction.AccountInfractionHistory {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		infractionHistory = append(infractionHistory, &AccountInfractionHistoryEdge{
			Node:   MarshalAccountInfractionHistoryToGraphQL(node),
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

func MarshalModeratorToGraphQL(result *moderator.Moderator) *Moderator {
	return &Moderator{
		ID:           relay.NewID(Moderator{}, result.ID()),
		LastSelected: result.LastSelected(),
	}
}

func MarshalPostRejectionReasonToGraphQL(result *infraction.PostRejectionReason) *PostRejectionReason {
	return &PostRejectionReason{
		ID:         relay.NewID(PostRejectionReason{}, result.ID()),
		Reason:     result.Reason(),
		Infraction: result.Infraction(),
	}
}

func MarshalPostRejectionReasonToGraphQLConnection(results []*infraction.PostRejectionReason, cursor *paging.Cursor) *PostRejectionReasonConnection {

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

	var nodeAt func(int) *infraction.PostRejectionReason

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *infraction.PostRejectionReason {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *infraction.PostRejectionReason {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		rejectionReasons = append(rejectionReasons, &PostRejectionReasonEdge{
			Node:   MarshalPostRejectionReasonToGraphQL(node),
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
