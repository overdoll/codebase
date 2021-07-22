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

func MarshalAccountToGraphQLConnection(results []*account.Account, cursor *paging.Cursor) *AccountConnection {

	var accEdges []*AccountEdge

	conn := &AccountConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: accEdges,
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

	var nodeAt func(int) *account.Account

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *account.Account {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *account.Account {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		accEdges = append(accEdges, &AccountEdge{
			Node:   MarshalAccountToGraphQL(node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = accEdges

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
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

func MarshalAccountEmailToGraphQLConnection(results []*account.Email, cursor *paging.Cursor) *AccountEmailConnection {

	var accEmails []*AccountEmailEdge

	conn := &AccountEmailConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: accEmails,
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

	var nodeAt func(int) *account.Email

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *account.Email {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *account.Email {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		accEmails = append(accEmails, &AccountEmailEdge{
			Node:   MarshalAccountEmailToGraphQL(node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = accEmails

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalAccountUsernameToGraphQLConnection(results []*account.Username, cursor *paging.Cursor) *AccountUsernameConnection {

	var accUsernames []*AccountUsernameEdge

	conn := &AccountUsernameConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: accUsernames,
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

	var nodeAt func(int) *account.Username

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *account.Username {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *account.Username {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		accUsernames = append(accUsernames, &AccountUsernameEdge{
			Node:   MarshalAccountUsernameToGraphQL(node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = accUsernames

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
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

func MarshalAccountSessionToGraphQLConnection(results []*session.Session, cursor *paging.Cursor) *AccountSessionConnection {

	var accSessions []*AccountSessionEdge

	conn := &AccountSessionConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: accSessions,
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

	var nodeAt func(int) *session.Session

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *session.Session {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *session.Session {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		accSessions = append(accSessions, &AccountSessionEdge{
			Node:   MarshalAccountSessionToGraphQL(node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = accSessions

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}
