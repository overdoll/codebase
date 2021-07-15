package queries

import (
	"context"
	"net/http"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/app/command"
	"overdoll/applications/eva/src/domain/token"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
	"overdoll/libraries/passport"
)

func (r *QueryResolver) RedeemAuthenticationToken(ctx context.Context, tokenId string) (*types.AuthenticationToken, error) {
	// RedeemAuthenticationToken - this is when the user uses the redeemed cookie. This will
	// occur when the user uses the redeemed cookie in the same browser that has the 'otp-key' cookie

	// If this is a login (user with email exists), we remove the otp-cookie & pass account data.

	// If this is a registration (user with email doesn't exist), we keep the cookie, and remove it when we register, so the user
	// can complete the registration if they've accidentally closed their tab

	pass := passport.FromContext(ctx)

	// User is logged in
	if pass.IsAuthenticated() {
		return nil, nil
	}

	gc := helpers.GinContextFromContext(ctx)

	_, err := cookies.ReadCookie(ctx, token.OTPKey)

	isSameSession := err == nil

	if err != nil && err != http.ErrNoCookie {
		return nil, command.ErrFailedTokenRedeem
	}

	// redeemCookie first
	ck, err := r.App.Commands.RedeemAuthenticationToken.Handle(ctx, tokenId)

	if err != nil {
		return nil, err
	}

	if ck == nil {
		return nil, nil
	}

	// cookie redeemed not in the same session, just redeem it
	if !isSameSession {
		return &types.AuthenticationToken{
			SameSession:   isSameSession,
			Redeemed:      ck.Redeemed(),
			Session:       ck.Session(),
			Email:         ck.Email(),
			AccountStatus: nil,
		}, nil
	}

	// consume cookie
	usr, ck, err := r.App.Commands.ConsumeAuthenticationToken.Handle(ctx, tokenId)

	if err != nil {
		return nil, err
	}

	// send back MFA types
	var multiFactorTypes []types.MultiFactorTypeEnum

	if ck.IsTOTPRequired() {
		multiFactorTypes = append(multiFactorTypes, types.MultiFactorTypeEnumTotp)
	}

	if usr != nil {
		// Remove OTP cookie
		http.SetCookie(gc.Writer, &http.Cookie{Name: token.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

		// Update passport to include our new user
		if err := pass.MutatePassport(ctx, func(p *passport.Passport) error {
			p.SetAccount(usr.ID())
			return nil
		}); err != nil {
			return nil, err
		}

		return &types.AuthenticationToken{
			SameSession: isSameSession,
			Redeemed:    ck.Redeemed(),
			Session:     ck.Session(),
			Email:       ck.Email(),
			AccountStatus: &types.AuthenticationTokenAccountStatus{
				Registered:    true,
				Authenticated: true,
				MultiFactor:   multiFactorTypes,
			},
		}, nil
	}

	return &types.AuthenticationToken{
		SameSession: isSameSession,
		Redeemed:    ck.Redeemed(),
		Session:     ck.Session(),
		Email:       ck.Email(),
		AccountStatus: &types.AuthenticationTokenAccountStatus{
			Registered:    true,
			Authenticated: false,
			MultiFactor:   multiFactorTypes,
		},
	}, nil
}

// AuthenticatedAccount - resolve currently authenticated account
// will also authenticate the user if they have the authentication cookie and it was redeemed
func (r *QueryResolver) AuthenticatedAccount(ctx context.Context) (*types.Account, error) {
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

	acc, ck, err := r.App.Commands.ConsumeAuthenticationToken.Handle(ctx, otpCookie.Value)

	if err != nil {
		if ck != nil {
			// token not yet redeemed
			if err == token.ErrTokenNotRedeemed {
				return nil, nil
			}

			// token not found
			if err == token.ErrTokenNotFound {
				return nil, nil
			}
		}

		return nil, err
	}

	if acc != nil {
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

func (r *QueryResolver) AuthenticationTokenStatus(ctx context.Context) (*types.AuthenticationToken, error) {

	pass := passport.FromContext(ctx)

	// User is logged in
	if pass.IsAuthenticated() {
		return nil, nil
	}

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

	ck, err := r.App.Queries.GetAuthenticationToken.Handle(ctx, otpCookie.Value)

	if err != nil {

		if err == token.ErrTokenNotFound {
			return nil, nil
		}

		return nil, err
	}

	var multiFactorTypes []types.MultiFactorTypeEnum

	if ck.IsTOTPRequired() {
		multiFactorTypes = append(multiFactorTypes, types.MultiFactorTypeEnumTotp)
	}

	return &types.AuthenticationToken{
		SameSession: true,
		Redeemed:    ck.Redeemed(),
		Session:     ck.Session(),
		Email:       ck.Email(),
		AccountStatus: &types.AuthenticationTokenAccountStatus{
			Registered:  true,
			MultiFactor: multiFactorTypes,
		},
	}, nil
}
