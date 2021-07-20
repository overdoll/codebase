package types

import (
	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/session"
	"overdoll/applications/eva/src/domain/token"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
)

func MarshalAccountToGraphQL(result *account.Account) *Account {

	if result == nil {
		return nil
	}

	return &Account{
		ID:          relay.NewID(Account{}, result.ID()),
		Reference:   result.ID(),
		Avatar:      result.ConvertAvatarToURI(),
		Username:    result.Username(),
		IsStaff:     result.IsStaff(),
		IsModerator: result.IsModerator(),
		IsArtist:    result.IsArtist(),
	}
}

func MarshalAccountToGraphQLConnection(results []*account.Account, page *paging.Info) *AccountConnection {

	var accEdges []*AccountEdge

	for _, acc := range results {

		accEdges = append(accEdges, &AccountEdge{
			Cursor: acc.Cursor(),
			Node:   MarshalAccountToGraphQL(acc),
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

	return &AccountConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     page.HasNextPage(),
			HasPreviousPage: page.HasPrevPage(),
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
		Edges: accEdges,
	}
}

func MarshalAccountLockToGraphQL(result *account.Account) *AccountLock {

	if result == nil {
		return nil
	}

	var lock *AccountLock

	if result.IsLocked() {
		var reason AccountLockReason

		if result.IsLockedDueToPostInfraction() {
			reason = AccountLockReasonPostInfraction
		}

		lock = &AccountLock{
			Expires: result.LockedUntil(),
			Reason:  reason,
		}
	}

	return lock
}

func MarshalAccountEmailToGraphQL(result *account.Email) *AccountEmail {

	var status AccountEmailStatus

	if result.IsConfirmed() {
		status = AccountEmailStatusConfirmed
	}

	if result.IsUnconfirmed() {
		status = AccountEmailStatusUnconfirmed
	}

	if result.IsPrimary() {
		status = AccountEmailStatusPrimary
	}

	return &AccountEmail{
		ID:     relay.NewID(AccountEmail{}, result.AccountId(), result.Email()),
		Email:  result.Email(),
		Status: status,
	}
}

func MarshalAccountUsernameToGraphQL(result *account.Username) *AccountUsername {
	return &AccountUsername{
		ID:       relay.NewID(AccountUsername{}, result.AccountId(), result.Username()),
		Username: result.Username(),
	}
}

func MarshalAuthenticationTokenToGraphQL(result *token.AuthenticationToken, sameSession, registered bool) *AuthenticationToken {

	var multiFactorTypes []MultiFactorType

	if registered {
		if result.IsTOTPRequired() {
			multiFactorTypes = append(multiFactorTypes, MultiFactorTypeTotp)
		}
	}

	return &AuthenticationToken{
		SameSession: sameSession,
		Verified:    result.Verified(),
		Session:     result.Session(),
		Email:       result.Email(),
		AccountStatus: &AuthenticationTokenAccountStatus{
			Registered:    registered,
			Authenticated: registered && multiFactorTypes == nil,
			MultiFactor:   multiFactorTypes,
		},
	}
}

func MarshalAccountEmailToGraphQLConnection(results []*account.Email, page *paging.Info) *AccountEmailConnection {

	var accEmails []*AccountEmailEdge

	for _, email := range results {

		accEmails = append(accEmails, &AccountEmailEdge{
			Cursor: email.Cursor(),
			Node:   MarshalAccountEmailToGraphQL(email),
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
			Cursor: username.Cursor(),
			Node:   MarshalAccountUsernameToGraphQL(username),
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

func MarshalAccountSessionToGraphQL(result *session.Session) *AccountSession {
	return &AccountSession{
		UserAgent: result.UserAgent(),
		IP:        result.IP(),
		Created:   result.Created(),
		ID:        relay.NewID(AccountSession{}, result.ID()),
		Current:   result.IsCurrent(),
	}
}

func MarshalAccountSessionToGraphQLConnection(results []*session.Session, page *paging.Info) *AccountSessionConnection {

	var accSessions []*AccountSessionEdge

	for _, result := range results {
		accSessions = append(accSessions, &AccountSessionEdge{
			Cursor: result.Cursor(),
			Node:   MarshalAccountSessionToGraphQL(result),
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
