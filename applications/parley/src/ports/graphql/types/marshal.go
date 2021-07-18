package types

import (
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
)

func MarshalPendingPostAuditLogToGraphQL(result *infraction.PendingPostAuditLog) *PendingPostAuditLog {
	var infractionId *relay.ID

	if result.IsDeniedWithInfraction() {
		id := relay.NewID(AccountInfractionHistory{}, result.Contributor().ID(), result.UserInfraction().ID())
		infractionId = &id
	}

	reason := ""

	if result.IsDenied() {
		reason = result.RejectionReason().Reason()
	}

	var action PendingPostAuditLogActionEnum

	if result.IsDenied() {
		action = PendingPostAuditLogActionEnumDenied
	}

	if result.IsApproved() {
		action = PendingPostAuditLogActionEnumApproved
	}

	return &PendingPostAuditLog{
		ID:              relay.NewID(PendingPostAuditLog{}, result.ID()),
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

func MarshalPendingPostAuditLogToGraphQLConnection(results []*infraction.PendingPostAuditLog, page *paging.Info) *PendingPostAuditLogConnection {

	var auditLogs []*PendingPostAuditLogEdge

	for _, log := range results {
		auditLogs = append(auditLogs, &PendingPostAuditLogEdge{
			Node:   MarshalPendingPostAuditLogToGraphQL(log),
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

	return &PendingPostAuditLogConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     page.HasNextPage(),
			HasPreviousPage: page.HasPrevPage(),
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
		Edges: auditLogs,
	}
}

func MarshalAccountInfractionHistoryToGraphQLConnection(results []*infraction.AccountInfractionHistory, page *paging.Info) *AccountInfractionHistoryConnection {

	var infractionHistory []*AccountInfractionHistoryEdge

	for _, infra := range results {
		infractionHistory = append(infractionHistory, &AccountInfractionHistoryEdge{
			Node: &AccountInfractionHistory{
				ID:     relay.NewID(AccountInfractionHistory{}, infra.AccountId(), infra.ID()),
				Reason: infra.Reason(),
			},
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

func MarshalPendingPostRejectionReasonToGraphQLConnection(results []*infraction.PendingPostRejectionReason, page *paging.Info) *PendingPostRejectionReasonConnection {

	var rejectionReasons []*PendingPostRejectionReasonEdge

	for _, reason := range results {
		rejectionReasons = append(rejectionReasons, &PendingPostRejectionReasonEdge{
			Node: &PendingPostRejectionReason{
				ID:         relay.NewID(PendingPostRejectionReason{}, reason.ID()),
				Reason:     reason.Reason(),
				Infraction: reason.Infraction(),
			},
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

	return &PendingPostRejectionReasonConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     page.HasNextPage(),
			HasPreviousPage: page.HasPrevPage(),
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
		Edges: rejectionReasons,
	}
}
