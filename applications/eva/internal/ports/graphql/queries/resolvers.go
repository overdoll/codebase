package queries

import (
	"context"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/app/query"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/passport"
)

type QueryResolver struct {
	App *app.Application
}

func (r *QueryResolver) Account(ctx context.Context, username string) (*types.Account, error) {

	acc, err := r.App.Queries.AccountByUsername.Handle(ctx, username)

	if err != nil {

		if domainerror.IsNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAccountToGraphQL(acc), nil
}

func (r *QueryResolver) ViewAuthenticationToken(ctx context.Context, tk string, secret *string) (*types.AuthenticationToken, error) {

	if tk == "" {
		return nil, nil
	}

	ck, acc, err := r.App.Queries.ViewAuthenticationToken.Handle(ctx, query.ViewAuthenticationToken{
		Token:    tk,
		Secret:   secret,
		Passport: passport.FromContext(ctx),
	})

	if err != nil {

		if err == token.ErrTokenNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAuthenticationTokenToGraphQL(ctx, ck, acc), nil
}

func (r *QueryResolver) Viewer(ctx context.Context) (*types.Account, error) {

	// User is logged in
	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, nil
	}

	acc, err := r.App.Queries.AccountById.Handle(ctx, passport.FromContext(ctx).AccountID())

	if err != nil {

		if domainerror.IsNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAccountToGraphQL(acc), nil
}
