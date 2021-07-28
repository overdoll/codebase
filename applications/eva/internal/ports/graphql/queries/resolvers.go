package queries

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/app/query"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/cookies"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
)

type QueryResolver struct {
	App *app.Application
}

func (r *QueryResolver) Accounts(ctx context.Context, after *string, before *string, first *int, last *int, username *string, isArtist *bool) (*types.AccountConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	usrname := ""

	if username != nil {
		usrname = *username
	}

	artist := false

	if isArtist != nil {
		artist = *isArtist
	}

	results, err := r.App.Queries.SearchAccounts.Handle(ctx, query.SearchAccounts{
		Cursor:   cursor,
		Username: usrname,
		IsArtist: artist,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountToGraphQLConnection(results, cursor), nil
}

func (r *QueryResolver) Account(ctx context.Context, username string) (*types.Account, error) {

	acc, err := r.App.Queries.AccountByUsername.Handle(ctx, username)

	if err != nil {

		if err == account.ErrAccountNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAccountToGraphQL(acc), nil
}

func (r *QueryResolver) ViewAuthenticationToken(ctx context.Context) (*types.AuthenticationToken, error) {

	// User is not logged in, let's check for an OTP token
	otpCookie, err := cookies.ReadCookie(ctx, token.OTPKey)

	if err == cookies.ErrCookieNotFound {
		return nil, nil
	}

	// Error
	if err != nil {
		return nil, err
	}

	acc, ck, err := r.App.Queries.AuthenticationTokenById.Handle(ctx, query.AuthenticationTokenById{
		TokenId: otpCookie.Value,
	})

	if err != nil {
		return nil, err
	}

	if ck == nil {
		return nil, nil
	}

	return types.MarshalAuthenticationTokenToGraphQL(ck, true, acc != nil), nil
}

func (r *QueryResolver) Viewer(ctx context.Context) (*types.Account, error) {

	pass := passport.FromContext(ctx)

	err := pass.Authenticated()

	// User is logged in
	if err == nil {

		acc, err := r.App.Queries.AccountById.Handle(ctx, pass.AccountID())

		if err != nil {

			if err == account.ErrAccountNotFound {
				return nil, nil
			}

			return nil, err
		}

		return types.MarshalAccountToGraphQL(acc), nil
	}

	// User is not logged in, let's check for an OTP token
	otpCookie, err := cookies.ReadCookie(ctx, token.OTPKey)

	if err == cookies.ErrCookieNotFound {
		return nil, nil
	}

	// Error
	if err != nil {
		return nil, err
	}

	// consume cookie
	acc, ck, err := r.App.Queries.AuthenticationTokenById.Handle(ctx, query.AuthenticationTokenById{
		TokenId: otpCookie.Value,
	})

	if err != nil {
		return nil, err
	}

	if acc != nil && ck.Verified() {

		if err := r.App.Commands.ConsumeAuthenticationToken.Handle(ctx, command.ConsumeAuthenticationToken{
			TokenId: otpCookie.Value,
		}); err != nil {
			return nil, err
		}

		// user had token and it was used to log in
		cookies.DeleteCookie(ctx, token.OTPKey)

		// Update passport to include our new user
		if err := pass.MutatePassport(ctx, func(p *passport.Passport) error {
			p.SetAccount(acc.ID())
			return nil
		}); err != nil {
			return nil, err
		}

		return types.MarshalAccountToGraphQL(acc), nil
	}

	return nil, nil
}
