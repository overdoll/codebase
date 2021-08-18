package queries

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/eva/internal/app"
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

func (r *QueryResolver) Accounts(ctx context.Context, after *string, before *string, first *int, last *int, username *string) (*types.AccountConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	usrname := ""

	if username != nil {
		usrname = *username
	}

	results, err := r.App.Queries.SearchAccounts.Handle(ctx, query.SearchAccounts{
		Cursor:   cursor,
		Username: usrname,
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

func (r *QueryResolver) ViewAuthenticationToken(ctx context.Context, tk *string) (*types.AuthenticationToken, error) {

	tokenId := ""

	// check for empty string as well
	if tk != nil {
		tokenId = *tk
	} else {
		otpCookie, err := cookies.ReadCookie(ctx, token.OTPKey)

		if err == nil {
			tokenId = otpCookie.Value
		}
	}

	if tokenId == "" {
		return nil, nil
	}

	ck, err := r.App.Queries.AuthenticationTokenById.Handle(ctx, query.AuthenticationTokenById{
		TokenId: tokenId,
	})

	if err != nil {

		if err == token.ErrTokenNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAuthenticationTokenToGraphQL(ctx, ck), nil
}

func (r *QueryResolver) Viewer(ctx context.Context) (*types.Account, error) {

	// User is logged in
	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, nil
	}

	acc, err := r.App.Queries.AccountById.Handle(ctx, passport.FromContext(ctx).AccountID())

	if err != nil {

		if err == account.ErrAccountNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAccountToGraphQL(acc), nil

}
