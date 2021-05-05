package command

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
	"overdoll/libraries/ksuid"
	"overdoll/libraries/passport"
)

type RegisterHandler struct {
	cr cookie.Repository
	ur user.Repository
}

func NewRegisterHandler(cr cookie.Repository, ur user.Repository) RegisterHandler {
	return RegisterHandler{cr: cr, ur: ur}
}

func (h RegisterHandler) Handle(ctx context.Context, username string) (bool, error) {
	pass := passport.FromContext(ctx)

	if pass.IsAuthenticated() {
		return false, errors.New("user currently logged in")
	}

	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	if err != nil {

		// Cookie doesn't exist
		if err == http.ErrNoCookie {
			return false, err
		}
	}

	if currentCookie == nil {
		return false, errors.New("cannot register - no cookie present")
	}

	cookieId := currentCookie.Value

	ck, err := h.cr.GetCookieById(ctx, cookieId)

	if err != nil {
		return false, fmt.Errorf("could not get cookie: %s", err)
	}

	// Cookie should have been redeemed at this point, if we are on this command
	if err := ck.MakeConsumed(); err == nil {
		return false, fmt.Errorf("cookie not valid: %s", err)
	}

	instance, err := user.NewUser(ksuid.New().String(), username, ck.Email())

	if err != nil {
		return false, fmt.Errorf("bad user %s", err)
	}

	err = h.ur.CreateUser(ctx, instance)

	if err != nil {
		return false, fmt.Errorf("could not create user %s", err)
	}

	http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	// TODO: create a new passport here

	return true, err
}
