package types

import (
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/applications/parley/src/domain/moderator"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
)

func MarshalPostAuditLogToGraphQL(result *infraction.PostAuditLog) *PostAuditLog {
	var infractionId *relay.ID

	if result.IsDeniedWithInfraction() {
		id := relay.NewID(AccountInfractionHistory{}, result.ContributorId(), result.UserInfraction().ID())
		infractionId = &id
	}

	reason := ""

	if result.IsDenied() {
		reason = result.RejectionReason().Reason()
	}

	var action PostAuditLogAction

	if result.IsDenied() {
		action = PostAuditLogActionDenied
	}

	if result.IsApproved() {
		action = PostAuditLogActionApproved
	}

	return &PostAuditLog{
		ID:              relay.NewID(PostAuditLog{}, result.PendingPostID(), result.ID()),
		Contributor:     &Account{ID: relay.NewID(Account{}, result.ContributorId())},
		Moderator:       &Account{ID: relay.NewID(Account{}, result.ModeratorId())},
		InfractionID:    infractionId,
		Action:          action,
		Reason:          reason,
		Notes:           result.Notes(),
		Reverted:        result.Reverted(),
		ReversibleUntil: result.ReversibleUntil(),
	}
}

func MarshalPostAuditLogToGraphQLConnection(results []*infraction.PostAuditLog, cursor *paging.Cursor, page *paging.Info) *PostAuditLogConnection {

	var auditLogs []*PostAuditLogEdge

	results = results[:len(results)-1]

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
