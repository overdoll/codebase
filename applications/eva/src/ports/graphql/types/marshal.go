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

	var lock *AccountLockDetails

	if result.IsLocked() {
		var reason AccountLockReasonEnum

		if result.IsLockedDueToPostInfraction() {
			reason = AccountLockReasonEnumPostInfraction
		}

		lock = &AccountLockDetails{
			Expires: result.LockedUntil(),
			Reason:  reason,
		}
	}

	return &Account{
		ID:          relay.NewID(Account{}, result.ID()),
		Username:    result.Username(),
		IsStaff:     result.IsStaff(),
		IsModerator: result.IsModerator(),
		IsLocked:    result.IsLocked(),
		LockDetails: lock,
	}
}

func MarshalAccountEmailToGraphQL(result *account.Email) *AccountEmail {

	var status AccountEmailStatusEnum

	if result.IsConfirmed() {
		status = AccountEmailStatusEnumConfirmed
	}

	if result.IsUnconfirmed() {
		status = AccountEmailStatusEnumUnconfirmed
	}

	if result.IsPrimary() {
		status = AccountEmailStatusEnumPrimary
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

	var multiFactorTypes []MultiFactorTypeEnum

	if registered {
		if result.IsTOTPRequired() {
			multiFactorTypes = append(multiFactorTypes, MultiFactorTypeEnumTotp)
		}
	}

	return &AuthenticationToken{
		SameSession: sameSession,
		Redeemed:    result.Redeemed(),
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
