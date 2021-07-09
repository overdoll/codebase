package queries

import (
	"context"
	"net/http"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/app/command"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
	"overdoll/libraries/passport"
)

func (r *QueryResolver) RedeemCookie(ctx context.Context, cookieId string) (*types.Cookie, error) {
	// RedeemCookie - this is when the user uses the redeemed cookie. This will
	// occur when the user uses the redeemed cookie in the same browser that has the 'otp-cookie' cookie

	// If this is a login (user with email exists), we remove the otp-cookie & pass account data.

	// If this is a registration (user with email doesn't exist), we keep the cookie, and remove it when we register, so the user
	// can complete the registration if they've accidentally closed their tab

	pass := passport.FromContext(ctx)

	// User is logged in
	if pass.IsAuthenticated() {
		return nil, nil
	}

	gc := helpers.GinContextFromContext(ctx)

	_, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	isSameSession := err == nil

	if err != nil && err != http.ErrNoCookie {
		return nil, command.ErrFailedCookieRedeem
	}

	// redeemCookie first
	ck, err := r.App.Commands.RedeemCookie.Handle(ctx, cookieId)

	if err != nil {
		return nil, err
	}

	if ck == nil {
		return &types.Cookie{
			SameSession: false,
			Registered:  false,
			Redeemed:    false,
			Session:     "",
			Email:       "",
			Invalid:     true,
		}, nil
	}

	// cookie redeemed not in the same session, just redeem it
	if !isSameSession {
		return &types.Cookie{
			SameSession: isSameSession,
			Registered:  false,
			Redeemed:    ck.Redeemed(),
			Session:     ck.Session(),
			Email:       ck.Email(),
			Invalid:     false,
		}, nil
	}

	// consume cookie
	usr, ck, err := r.App.Commands.ConsumeCookie.Handle(ctx, cookieId)

	if err != nil {
		return nil, err
	}

	if usr != nil {
		// Remove OTP cookie
		http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

		// Update passport to include our new user
		if err := pass.MutatePassport(ctx, func(p *passport.Passport) error {
			p.SetAccount(usr.ID())
			return nil
		}); err != nil {
			return nil, err
		}

		return &types.Cookie{
			SameSession: true,
			Registered:  true,
			Redeemed:    ck.Redeemed(),
			Session:     ck.Session(),
			Email:       ck.Email(),
			Invalid:     false,
		}, nil
	}

	// send back MFA types
	var multiFactorTypes []types.MultiFactorTypeEnum

	if ck.IsTOTPRequired() {
		multiFactorTypes = append(multiFactorTypes, types.MultiFactorTypeEnumTotp)
	}

	return &types.Cookie{
		SameSession: true,
		Registered:  false,
		Redeemed:    ck.Redeemed(),
		Session:     ck.Session(),
		Email:       ck.Email(),
		Invalid:     false,
		MultiFactor: multiFactorTypes,
	}, nil
}

func (r *QueryResolver) Authentication(ctx context.Context) (*types.Authentication, error) {

	pass := passport.FromContext(ctx)

	// User is logged in
	if pass.IsAuthenticated() {

		acc, err := r.App.Queries.GetAccount.Handle(ctx, pass.AccountID())

		if err != nil {
			return nil, err
		}

		return &types.Authentication{
			Cookie: nil,
			User:   types.MarshalUserToGraphQL(acc),
		}, nil
	}

	gc := helpers.GinContextFromContext(ctx)

	// User is not logged in, let's check for an OTP token
	otpCookie, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	// Error
	if err != nil && err != http.ErrNoCookie {
		zap.S().Errorf("failed to get cookie header: %s", err)
		return nil, command.ErrFailedAuthenticate
	}

	if err != nil && err == http.ErrNoCookie || otpCookie == nil {
		return &types.Authentication{
			Cookie: nil,
			User:   nil,
		}, nil
	}

	acc, ck, err := r.App.Commands.ConsumeCookie.Handle(ctx, otpCookie.Value)

	if err != nil {
		if err == cookie.ErrCookieNotRedeemed && ck != nil {
			return &types.Authentication{
				Cookie: &types.Cookie{
					SameSession: true,
					Registered:  false,
					Redeemed:    ck.Redeemed(),
					Session:     ck.Session(),
					Email:       ck.Email(),
					Invalid:     false,
				},
				User: nil,
			}, nil
		}

		return nil, err
	}

	if acc != nil {
		// user had cookie and it was used to log in
		http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

		// Update passport to include our new user
		if err := pass.MutatePassport(ctx, func(p *passport.Passport) error {
			p.SetAccount(acc.ID())
			return nil
		}); err != nil {
			return nil, err
		}

		return &types.Authentication{
			Cookie: nil,
			User:   types.MarshalUserToGraphQL(acc),
		}, nil
	}

	if ck != nil {
		// send back MFA types
		var multiFactorTypes []types.MultiFactorTypeEnum

		if ck.IsTOTPRequired() {
			multiFactorTypes = append(multiFactorTypes, types.MultiFactorTypeEnumTotp)
		}

		return &types.Authentication{
			Cookie: &types.Cookie{
				SameSession: true,
				Registered:  false,
				Redeemed:    ck.Redeemed(),
				Session:     ck.Session(),
				Email:       ck.Email(),
				Invalid:     false,
				MultiFactor: multiFactorTypes,
			},
			User: nil,
		}, nil
	}

	return &types.Authentication{
		Cookie: nil,
		User:   nil,
	}, nil
}
