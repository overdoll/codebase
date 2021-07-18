package types

import (
	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/session"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
)

func MarshalAccountToGraphQL(result *account.Account) *Viewer {

	var lock *AccountLock

	if result.IsLocked() {
		var reason AccountLockReasonEnum

		if result.IsLockedDueToPostInfraction() {
			reason = AccountLockReasonEnumPostInfraction
		}

		lock = &AccountLock{
			Expires: result.LockedUntil(),
			Reason:  reason,
		}
	}

	var roles []AccountRoleEnum

	if result.IsModerator() {
		roles = append(roles, AccountRoleEnumModerator)
	}

	if result.IsStaff() {
		roles = append(roles, AccountRoleEnumStaff)
	}

	return &Viewer{ID: result.ID(), Username: result.Username(), Roles: roles, Lock: lock, Avatar: result.Avatar(), Verified: result.Verified()}
}

func MarshalAccountEmailToGraphQLConnection(results []*account.Email, page *paging.Info) *AccountEmailConnection {

	var accEmails []*AccountEmailEdge

	for _, email := range results {

		var status AccountEmailStatusEnum

		if email.IsConfirmed() {
			status = AccountEmailStatusEnumConfirmed
		}

		if email.IsUnconfirmed() {
			status = AccountEmailStatusEnumUnconfirmed
		}

		if email.IsPrimary() {
			status = AccountEmailStatusEnumPrimary
		}

		accEmails = append(accEmails, &AccountEmailEdge{
			Cursor: email.Cursor(),
			Node: &AccountEmail{
				ID:     relay.NewID(AccountEmail{}, email.AccountId(), email.Email()),
				Email:  email.Email(),
				Status: status,
			},
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

	return &AccountEmailConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     page.HasNextPage(),
			HasPreviousPage: page.HasPrevPage(),
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
		Edges: accEmails,
	}
}

func MarshalAccountUsernameToGraphQLConnection(results []*account.Username, page *paging.Info) *AccountUsernameConnection {

	var accUsernames []*AccountUsernameEdge

	for _, username := range results {
		accUsernames = append(accUsernames, &AccountUsernameEdge{
			Cursor: "",
			Node: &AccountUsername{
				ID:       relay.NewID(AccountUsername{}, username.AccountId(), username.Username()),
				Username: username.Username(),
			},
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

	return &AccountUsernameConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     page.HasNextPage(),
			HasPreviousPage: page.HasPrevPage(),
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
		Edges: accUsernames,
	}
}

func MarshalAccountSessionToGraphQLConnection(results []*session.Session, page *paging.Info) *AccountSessionConnection {

	var accSessions []*AccountSessionEdge

	for _, result := range results {
		accSessions = append(accSessions, &AccountSessionEdge{
			Cursor: result.Cursor(),
			Node: &AccountSession{
				UserAgent: result.UserAgent(),
				IP:        result.IP(),
				Created:   result.Created(),
				ID:        relay.NewID(AccountSession{}, result.ID()),
				Current:   result.IsCurrent(),
			},
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

	return &AccountSessionConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     page.HasNextPage(),
			HasPreviousPage: page.HasPrevPage(),
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
		Edges: accSessions,
	}
}
