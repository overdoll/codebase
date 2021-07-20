package queries

import (
	"context"

	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/domain/token"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/cookies"
	"overdoll/libraries/passport"
)

type QueryResolver struct {
	App *app.Application
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

	acc, ck, err := r.App.Queries.AuthenticationTokenById.Handle(ctx, otpCookie.Value)

	if err != nil {

		if err == token.ErrTokenNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAuthenticationTokenToGraphQL(ck, true, acc != nil), nil
}

func (r *QueryResolver) Viewer(ctx context.Context) (*types.Account, error) {

	pass := passport.FromContext(ctx)

	// User is logged in
	if pass.IsAuthenticated() {

		acc, err := r.App.Queries.AccountById.Handle(ctx, pass.AccountID())

		if err != nil {
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
	acc, ck, err := r.App.Queries.AuthenticationTokenById.Handle(ctx, otpCookie.Value)

	if err != nil {
		return nil, err
	}

	if acc != nil && ck.Verified() {

		if err := r.App.Commands.ConsumeAuthenticationToken.Handle(ctx, otpCookie.Value); err != nil {
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
