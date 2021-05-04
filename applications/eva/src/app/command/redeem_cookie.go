package command

import (
	"context"
	"fmt"
	"net/http"

	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/applications/hades/src/domain/otp"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
)

type RedeemCookieHandler struct {
	cr cookie.Repository
	ur user.Repository
}

func NewRedeemCookieHandler(cr cookie.Repository, ur user.Repository) RedeemCookieHandler {
	return RedeemCookieHandler{cr: cr, ur: ur}
}

func (h RedeemCookieHandler) Handle(ctx context.Context, id string) (*cookie.Cookie, error) {

	// RedeemCookie - this is when the user uses the redeemed cookie. This will
	// occur when the user uses the redeemed cookie in the same browser that has the 'otp-cookie' cookie

	// If this is a login (user with email exists), we remove the otp-cookie & pass account data.

	// If this is a registration (user with email doesn't exist), we keep the cookie, and remove it when we register, so the user
	// can complete the registration if they've accidentally closed their tab

	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	if err != nil {

		// Cookie doesn't exist
		if err == http.ErrNoCookie {

			redeemedCookie, err := h.eva.RedeemCookie(ctx, ck)

			// Attempted to redeem cookie, but it is invalid or expired
			if err != nil {
				return nil, err
			}

			// TODO: send message to kafka queue to tell that the cookie is redeemed

			// No cookie exists, we want to give a different SameSession response
			return &types.Cookie{
				SameSession: false,
				Registered:  false,
				Redeemed:    redeemedCookie.Cookie.Redeemed,
				Session:     redeemedCookie.Cookie.Session,
				Email:       redeemedCookie.Cookie.Email,
				Invalid:     false,
			}, nil
		}

		return nil, err
	}

	// cookie in cookie has to match the url cookie, otherwise any cookie can just be redeemed with an arbitrary value
	if currentCookie.Value != ck {
		return nil, errors.New("invalid cookie")
	}

	result, err := h.eva.AttemptConsumeCookie(ctx, ck)

	if err != nil {
		// cookie invalid or expired
		return nil, err
	}

	// nil session = user not registered yet
	if result.Session == nil {
		return &types.Cookie{
			SameSession: true,
			Registered:  false,
			Redeemed:    true,
			Session:     result.Cookie.Session,
			Email:       result.Cookie.Email,
			Invalid:     false,
		}, nil
	}

	// Remove OTP cookie
	http.SetCookie(gc.Writer, &http.Cookie{Name: otp.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	// TODO: set session cookie here from ck.Session.Token

	// TODO: send message that cookie is redeemed

	return &types.Cookie{
		SameSession: true,
		Registered:  true,
		Redeemed:    true,
		Session:     result.Cookie.Session,
		Email:       result.Cookie.Email,
		Invalid:     false,
	}, err

	// RPC

	ck, err := h.cr.GetCookieById(ctx, id)

	if err != nil {
		return nil, fmt.Errorf("could not get cookie: %s", err)
	}

	// Redeem the cookie
	if err := ck.MakeRedeemed(); err != nil {
		return nil, err
	}

	err = h.cr.UpdateCookie(ctx, ck)

	if err != nil {
		return nil, fmt.Errorf("failed to update cookie: %s", err)
	}

	_, err = h.ur.GetUserByEmail(ctx, ck.Email())

	// we weren't able to get our user, so that means that the cookie is not going to be deleted
	if err != nil {
		return ck, nil
	}

	// Consume the cookie
	if err := ck.MakeConsumed(); err != nil {
		return nil, err
	}

	// Delete cookie - user is registered, so we don't need to wait for another call where the user will
	// enter a username, since they already have an account and we can log them in
	err = h.cr.DeleteCookieById(ctx, id)

	if err != nil {
		return nil, fmt.Errorf("failed to delete cookie: %s", err)
	}

	return ck, nil
}
