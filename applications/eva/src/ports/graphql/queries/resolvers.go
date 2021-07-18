package queries

import (
	"context"
	"net/http"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"go.uber.org/zap"
	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/app/command"
	"overdoll/applications/eva/src/domain/token"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
	"overdoll/libraries/passport"
)

type QueryResolver struct {
	App *app.Application
}

func (r *QueryResolver) VerifyAuthenticationTokenAndAttemptAccountAccessGrant(ctx context.Context, input types.VerifyAuthenticationTokenAndAttemptAccountAccessGrantInput) (*types.VerifyAuthenticationTokenAndAttemptAccountAccessGrantPayload, error) {
	// RedeemAuthenticationToken - this is when the user uses the redeemed cookie. This will
	// occur when the user uses the redeemed cookie in the same browser that has the 'otp-key' cookie

	// If this is a login (user with email exists), we remove the otp-cookie & pass account data.

	// If this is a registration (user with email doesn't exist), we keep the cookie, and remove it when we register, so the user
	// can complete the registration if they've accidentally closed their tab
	gc := helpers.GinContextFromContext(ctx)

	_, err := cookies.ReadCookie(ctx, token.OTPKey)

	isSameSession := err == nil

	if err != nil && err != http.ErrNoCookie {
		return nil, command.ErrFailedTokenRedeem
	}

	// redeemCookie first
	ck, err := r.App.Commands.RedeemAuthenticationToken.Handle(ctx, input.AuthenticationTokenID)

	if err != nil {
		return nil, err
	}

	if ck == nil {
		return nil, nil
	}

	// cookie redeemed not in the same session, just redeem it
	if !isSameSession {
		return &types.VerifyAuthenticationTokenAndAttemptAccountAccessGrantPayload{
			Account:             nil,
			AuthenticationToken: types.MarshalAuthenticationTokenToGraphQL(ck, isSameSession, false),
		}, nil
	}

	// consume cookie
	usr, ck, err := r.App.Queries.GetAuthenticationTokenStatus.Handle(ctx, input.AuthenticationTokenID)

	if err != nil {
		return nil, err
	}

	if usr != nil {
		// consume cookie since user is valid here
		if err := r.App.Commands.ConsumeAuthenticationToken.Handle(ctx, input.AuthenticationTokenID); err != nil {
			return nil, err
		}

		// Remove OTP cookie
		http.SetCookie(gc.Writer, &http.Cookie{Name: token.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

		// Update passport to include our new user
		if err := passport.FromContext(ctx).MutatePassport(ctx, func(p *passport.Passport) error {
			p.SetAccount(usr.ID())
			return nil
		}); err != nil {
			return nil, err
		}
	}

	return &types.VerifyAuthenticationTokenAndAttemptAccountAccessGrantPayload{
		Account:             types.MarshalAccountToGraphQL(usr),
		AuthenticationToken: types.MarshalAuthenticationTokenToGraphQL(ck, isSameSession, usr != nil),
	}, nil
}

func (r *QueryResolver) ViewAuthenticationToken(ctx context.Context) (*types.AuthenticationToken, error) {

	// User is not logged in, let's check for an OTP token
	otpCookie, err := cookies.ReadCookie(ctx, token.OTPKey)

	// Error
	if err != nil && err != http.ErrNoCookie {
		zap.S().Errorf("failed to get cookie header: %s", err)
		return nil, command.ErrFailedAuthenticate
	}

	if err != nil && err == http.ErrNoCookie || otpCookie == nil {
		return nil, nil
	}

	acc, ck, err := r.App.Queries.GetAuthenticationTokenStatus.Handle(ctx, otpCookie.Value)

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

		acc, err := r.App.Queries.GetAccount.Handle(ctx, pass.AccountID())

		if err != nil {
			return nil, err
		}

		return types.MarshalAccountToGraphQL(acc), nil
	}

	gc := helpers.GinContextFromContext(ctx)

	// User is not logged in, let's check for an OTP token
	otpCookie, err := cookies.ReadCookie(ctx, token.OTPKey)

	// Error
	if err != nil && err != http.ErrNoCookie {
		zap.S().Errorf("failed to get cookie header: %s", err)
		return nil, command.ErrFailedAuthenticate
	}

	if err != nil && err == http.ErrNoCookie || otpCookie == nil {
		return nil, nil
	}

	// consume cookie
	acc, ck, err := r.App.Queries.GetAuthenticationTokenStatus.Handle(ctx, otpCookie.Value)

	if err != nil {
		return nil, err
	}

	if acc != nil && ck.Redeemed() {

		if err := r.App.Commands.ConsumeAuthenticationToken.Handle(ctx, otpCookie.Value); err != nil {
			return nil, err
		}

		// user had token and it was used to log in
		http.SetCookie(gc.Writer, &http.Cookie{Name: token.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

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

func (r *QueryResolver) ConfirmAccountEmail(ctx context.Context, input types.ConfirmAccountEmailInput) (*types.ConfirmAccountEmailPayload, error) {

	email, validation, err := r.App.Commands.ConfirmAccountEmail.Handle(ctx, passport.FromContext(ctx).AccountID(), input.ID)

	if err != nil {
		return nil, err
	}

	if validation != "" {
		return nil, gqlerror.Errorf(validation)
	}

	return &types.ConfirmAccountEmailPayload{
		AccountEmail: types.MarshalAccountEmailToGraphQL(email),
	}, nil
}
