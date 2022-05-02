package types

import (
	"context"
	"encoding/hex"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/confirm_email"
	"overdoll/applications/eva/internal/domain/location"
	"overdoll/applications/eva/internal/domain/multi_factor"
	"overdoll/applications/eva/internal/domain/session"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"sort"
)

func MarshalLanguageToGraphQL(result *localization.Language) *graphql.Language {
	return &graphql.Language{Locale: result.Locale(), Name: result.Name()}
}

func MarshalAccountToGraphQL(result *account.Account) *Account {

	if result == nil {
		return nil
	}

	var accountAvatar *Resource

	if result.AvatarResourceId() != nil {
		accountAvatar = &Resource{
			ID: relay.NewID(Resource{}, result.ID(), *result.AvatarResourceId()),
		}
	}

	return &Account{
		ID:                      relay.NewID(Account{}, result.ID()),
		Reference:               result.ID(),
		Avatar:                  accountAvatar,
		Username:                result.Username(),
		IsSecure:                result.IsSecure(),
		IsStaff:                 result.IsStaff(),
		IsModerator:             result.IsModerator(),
		Lock:                    MarshalAccountLockToGraphQL(result),
		UsernameEditAvailableAt: result.UsernameEditAvailableAt(),
		MultiFactorEnabled:      result.MultiFactorEnabled(),
		CanDisableMultiFactor:   result.CanDisableMultiFactor(),
	}
}

func MarshalLocationToGraphQL(result *location.Location) *Location {
	return &Location{
		City:        result.City(),
		Country:     result.Country(),
		PostalCode:  result.PostalCode(),
		Subdivision: result.Subdivision(),
		Latitude:    result.Latitude(),
		Longitude:   result.Longitude(),
	}
}

func MarshalAccountLockToGraphQL(result *account.Account) *AccountLock {

	if result == nil {
		return nil
	}

	if result.IsLocked() {
		return &AccountLock{
			Expires: *result.LockedUntil(),
		}
	}

	return nil
}

func MarshalConfirmEmailToGraphQL(confirmEmail *confirm_email.ConfirmEmail, email string) *AccountEmail {

	return &AccountEmail{
		ID:     relay.NewID(AccountEmail{}, confirmEmail.AccountId(), email),
		Email:  email,
		Status: AccountEmailStatusUnconfirmed,
	}
}

func MarshalAccountEmailToGraphQL(result *account.Email) *AccountEmail {

	var status AccountEmailStatus

	if result.IsConfirmed() {
		status = AccountEmailStatusConfirmed
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

func MarshalAuthenticationTokenToGraphQL(ctx context.Context, result *token.AuthenticationToken, acc *account.Account) *AuthenticationToken {

	p := passport.FromContext(ctx)

	var accountStatus *AuthenticationTokenAccountStatus

	// only show account status if verified
	// this will only be populated if the token is verified anyways
	if result.Verified() {

		accountStatus = &AuthenticationTokenAccountStatus{
			Registered: acc != nil,
		}

		if acc != nil && acc.MultiFactorEnabled() {
			accountStatus.MultiFactor = &MultiFactor{
				Totp: true,
			}
		}
	}

	return &AuthenticationToken{
		ID:            relay.NewID(AuthenticationToken{}, result.Token()),
		Token:         result.Token(),
		SameDevice:    result.SameDevice(p),
		Verified:      result.Verified(),
		UserAgent:     result.UserAgent(),
		Location:      MarshalLocationToGraphQL(result.Location()),
		Secure:        result.IsSecure(p),
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

func MarshalAccountSessionToGraphQL(result *session.Session) *AccountSession {
	return &AccountSession{
		// encode session
		ID:       relay.NewID(AccountSession{}, hex.EncodeToString([]byte(result.ID()))),
		Device:   result.Device(),
		IP:       result.IP(),
		Location: MarshalLocationToGraphQL(result.Location()),
		Created:  result.Created(),
		LastSeen: result.LastSeen(),
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
