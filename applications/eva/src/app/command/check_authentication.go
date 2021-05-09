package command

import (
	"context"
	"errors"
	"net/http"
	"time"

	"github.com/gocql/gocql"
	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
	"overdoll/libraries/passport"
)

type AuthenticationHandler struct {
	cr cookie.Repository
	ur user.Repository
}

func NewAuthenticationHandler(cr cookie.Repository, ur user.Repository) AuthenticationHandler {
	return AuthenticationHandler{cr: cr, ur: ur}
}

var (
	ErrFailedCheckAuthentication = errors.New("failed to check auth")
)

func (h AuthenticationHandler) Handle(ctx context.Context) (*cookie.Cookie, *user.User, error) {

	_, _ = cookies.SetCookie(ctx, &http.Cookie{
		Name:    "asd",
		Value:   "asds",
		Expires: time.Now().Add(5 * time.Minute),
	})

	pass := passport.FromContext(ctx)

	// User is logged in
	if pass.IsAuthenticated() {

		usr, err := h.ur.GetUserById(ctx, pass.UserID())

		if err != nil {
			zap.S().Errorf("failed to get user: %s", err)
			return nil, nil, ErrFailedCheckAuthentication
		}

		return nil, usr, nil
	}

	gc := helpers.GinContextFromContext(ctx)

	// User is not logged in, let's check for an OTP token
	otpCookie, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	// Error
	if err != nil {

		// Error says that this cookie doesn't exist
		if err == http.ErrNoCookie {
			return nil, nil, nil
		}

		zap.S().Errorf("failed to get cookie header: %s", err)
		return nil, nil, ErrFailedCheckAuthentication
	}

	ck, err := h.cr.GetCookieById(ctx, otpCookie.Value)

	// Check to make sure we didn't get an error, and our cookie isn't expired
	if err != nil {

		if err == gocql.ErrNotFound {
			return nil, nil, nil
		}

		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, nil, ErrFailedCheckAuthentication
	}

	// check if expired
	if ck.IsExpired() {
		http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})
		return nil, nil, nil
	}

	// Not yet redeemed, user needs to redeem it still
	if !ck.Redeemed() {
		return ck, nil, nil
	}

	// Redeemed - check if user exists with this email
	usr, err := h.ur.GetUserByEmail(ctx, ck.Email())

	// we weren't able to get our user, so that means that the cookie is not going to be deleted
	// user has to register
	if err != nil {

		if err == gocql.ErrNotFound {
			return ck, nil, nil
		}

		zap.S().Errorf("failed to get user: %s", err)
		return nil, nil, ErrFailedCheckAuthentication
	}

	// Remove OTP cookie - no longer needed at this step
	http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	// Update passport to include our new user
	err = pass.MutatePassport(ctx, func(p *passport.Passport) error {
		p.SetUser(usr.ID())
		return nil
	})

	if err != nil {
		zap.S().Errorf("failed to mutate passport: %s", err)
		return nil, nil, ErrFailedCheckAuthentication
	}

	return ck, usr, nil
}
