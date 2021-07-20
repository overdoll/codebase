package types

import (
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
)

func MarshalPostAuditLogToGraphQL(result *infraction.PostAuditLog) *PostAuditLog {
	var infractionId *relay.ID

	if result.IsDeniedWithInfraction() {
		id := relay.NewID(AccountInfractionHistory{}, result.Contributor().ID(), result.UserInfraction().ID())
		infractionId = &id
	}

	reason := ""

	if result.IsDenied() {
		reason = result.RejectionReason().Reason()
	}

	var action PostAuditLogActionEnum

	if result.IsDenied() {
		action = PostAuditLogActionEnumDenied
	}

	if result.IsApproved() {
		action = PostAuditLogActionEnumApproved
	}

	return &PostAuditLog{
		ID:              relay.NewID(PostAuditLog{}, result.PendingPostID(), result.ID()),
		Contributor:     nil,
		Moderator:       nil,
		InfractionID:    infractionId,
		Action:          action,
		Reason:          reason,
		Notes:           result.Notes(),
		Reverted:        result.Reverted(),
		ReversibleUntil: result.ReversibleUntil(),
	}
}

func MarshalPostAuditLogToGraphQLConnection(results []*infraction.PostAuditLog, page *paging.Info) *PostAuditLogConnection {

	var auditLogs []*PostAuditLogEdge

	for _, log := range results {
		auditLogs = append(auditLogs, &PostAuditLogEdge{
			Node:   MarshalPostAuditLogToGraphQL(log),
			Cursor: log.Cursor(),
		})
	}

	var startCursor *string
	var endCursor *string

	if len(results) > 0 {
		res := results[0].Cursor()
		startCursor = &res
		res = results[len(results)-1].Cursor()
		endCursor = &res
	}

	return &PostAuditLogConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     page.HasNextPage(),
			HasPreviousPage: page.HasPrevPage(),
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
		Edges: auditLogs,
	}
}

func MarshalAccountInfractionHistoryToGraphQL(result *infraction.AccountInfractionHistory) *AccountInfractionHistory {
	return &AccountInfractionHistory{
		ID:     relay.NewID(AccountInfractionHistory{}, result.AccountId(), result.ID()),
		Reason: result.Reason(),
	}
}

func MarshalAccountInfractionHistoryToGraphQLConnection(results []*infraction.AccountInfractionHistory, page *paging.Info) *AccountInfractionHistoryConnection {

	var infractionHistory []*AccountInfractionHistoryEdge

	for _, infra := range results {
		infractionHistory = append(infractionHistory, &AccountInfractionHistoryEdge{
			Node:   MarshalAccountInfractionHistoryToGraphQL(infra),
			Cursor: infra.Cursor(),
		})
	}

	var startCursor *string
	var endCursor *string

	if len(results) > 0 {
		res := results[0].Cursor()
		startCursor = &res
		res = results[len(results)-1].Cursor()
		endCursor = &res
	}

	return &AccountInfractionHistoryConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     page.HasNextPage(),
			HasPreviousPage: page.HasPrevPage(),
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
		Edges: infractionHistory,
	}
}

func MarshalPostRejectionReasonToGraphQL(result *infraction.PostRejectionReason) *PostRejectionReason {
	return &PostRejectionReason{
		ID:         relay.NewID(PostRejectionReason{}, result.ID()),
		Reason:     result.Reason(),
		Infraction: result.Infraction(),
	}
}

func MarshalPostRejectionReasonToGraphQLConnection(results []*infraction.PostRejectionReason, page *paging.Info) *PostRejectionReasonConnection {

	var rejectionReasons []*PostRejectionReasonEdge

	for _, reason := range results {
		rejectionReasons = append(rejectionReasons, &PostRejectionReasonEdge{
			Node:   MarshalPostRejectionReasonToGraphQL(reason),
			Cursor: reason.Cursor(),
		})
	}

	var startCursor *string
	var endCursor *string

	if len(results) > 0 {
		res := results[0].Cursor()
		startCursor = &res
		res = results[len(results)-1].Cursor()
		endCursor = &res
	}

	return &PostRejectionReasonConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     page.HasNextPage(),
			HasPreviousPage: page.HasPrevPage(),
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
		Edges: rejectionReasons,
	}
}
