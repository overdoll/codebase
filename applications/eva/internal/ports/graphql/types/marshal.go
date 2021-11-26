package types

import (
	"context"
	"crypto/sha256"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/location"
	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/applications/eva/internal/domain/session"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/libraries/cookies"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
	"overdoll/libraries/translations"
	"sort"
	"time"
)

func MarshalLanguageToGraphQL(result *translations.Language) *Language {
	return &Language{Locale: result.Locale()}
}

func MarshalAccountToGraphQL(result *account.Account) *Account {

	if result == nil {
		return nil
	}

	return &Account{
		ID:          relay.NewID(Account{}, result.ID()),
		Reference:   result.ID(),
		Avatar:      result.ConvertAvatarToURI(),
		Username:    result.Username(),
		Language:    MarshalLanguageToGraphQL(result.Language()),
		IsStaff:     result.IsStaff(),
		IsModerator: result.IsModerator(),
		Lock:        MarshalAccountLockToGraphQL(result),
	}
}

func MarshalLocationToGraphQL(result *location.Location) *Location {
	return &Location{
		IP:          result.IP(),
		City:        result.City(),
		Country:     result.Country(),
		PostalCode:  result.PostalCode(),
		Subdivision: result.Subdivision(),
		Latitude:    result.Latitude(),
		Longitude:   result.Longitude(),
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

	if result.IsLocked() {
		var reason AccountLockReason

		if result.IsLockedDueToPostInfraction() {
			reason = AccountLockReasonPostInfraction
		}

		return &AccountLock{
			Expires: time.Unix(int64(result.LockedUntil()), 0),
			Reason:  reason,
		}
	}

	return nil
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

func MarshalAuthenticationTokenToGraphQL(ctx context.Context, result *token.AuthenticationToken) *AuthenticationToken {

	var accountStatus *AuthenticationTokenAccountStatus

	sameSession := true

	// determine if the cookie is in the same session
	_, err := cookies.ReadCookie(ctx, token.OTPKey)

	if err == cookies.ErrCookieNotFound {
		sameSession = false
	}

	// only show account status if verified
	// this will only be populated if the token is verified anyways
	if result.Verified() {

		accountStatus = &AuthenticationTokenAccountStatus{
			Registered: result.Registered(),
		}

		if result.IsTOTPRequired() {
			accountStatus.MultiFactor = &MultiFactor{
				Totp: true,
			}
		}
	}

	// we need to provide a globally-unique ID for the authentication token
	// however we don't want to reveal the actual value (since it can be used to authenticate people)
	// so we just hash it
	hash := sha256.Sum256([]byte(result.Token()))
	return &AuthenticationToken{
		ID:            relay.NewID(AuthenticationToken{}, string(hash[:])),
		SameSession:   sameSession,
		Verified:      result.Verified(),
		Device:        result.Device(),
		Email:         result.Email(),
		Location:      MarshalLocationToGraphQL(result.Location()),
		Secure:        result.Location().IsSecure(ctx),
		AccountStatus: accountStatus,
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
		Device:   result.Device(),
		Location: MarshalLocationToGraphQL(result.Location()),
		Created:  result.Created(),
		ID:       relay.NewID(AccountSession{}, result.ID()),
		Current:  result.IsCurrent(),
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

	if len(results) == 0 {
		return conn
	}

	limit := cursor.GetLimit()

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

func MarshalRecoveryCodesToGraphql(ctx context.Context, codes []*multi_factor.RecoveryCode) []*AccountMultiFactorRecoveryCode {

	// sort so the order is consistent
	sort.SliceStable(codes, func(i, j int) bool {
		return codes[i].Code() < codes[j].Code()
	})

	var recoveryCodes []*AccountMultiFactorRecoveryCode

	for _, code := range codes {
		recoveryCodes = append(recoveryCodes, &AccountMultiFactorRecoveryCode{Code: code.Code()})
	}

	return recoveryCodes
}
