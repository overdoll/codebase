package command

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
	"overdoll/libraries/ksuid"
)

type AuthenticateHandler struct {
	cr cookie.Repository
}

func NewAuthenticateHandler(cr cookie.Repository) AuthenticateHandler {
	return AuthenticateHandler{cr: cr}
}

func (h AuthenticateHandler) Handle(ctx context.Context, email string) (bool, error) {
	// Authenticate - Generate an OTP code that will be used to authenticate the user
	// if user opens the link in the same browser, then we automatically authorize them
	// if not, then we redeem the cookie and the original browser should be logged in,
	// provided that the tab is still open
	gc := helpers.GinContextFromContext(ctx)

	// Capture session data
	type SessionData struct {
		UserAgent string `json:"user-agent"`
	}

	sessionData := SessionData{UserAgent: strings.Join(gc.Request.Header["User-Agent"], ",")}

	sessionJson, err := json.Marshal(sessionData)

	if err != nil {
		return false, err
	}

	// Create an authentication cookie
	instance, err := cookie.NewCookie(ksuid.New().String(), email, string(sessionJson))

	if err != nil {
		return false, err
	}

	err = h.cr.CreateCookie(ctx, instance)

	if err != nil {
		return false, err
	}

	// OTP login cookie - will determine if
	// Opened in the same browser - log them in that browser if this cookie exists
	// Otherwise, if opened in another browser (such as the phone), it will log them in on the original browser through a subscription
	_, err = cookies.SetCookie(ctx, &http.Cookie{
		Name:    cookie.OTPKey,
		Value:   instance.Cookie(),
		Expires: time.Now().Add(5 * time.Minute),
	})

	if err != nil {
		return false, err
	}

	return true, err
}
