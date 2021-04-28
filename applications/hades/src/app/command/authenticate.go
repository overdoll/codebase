package command

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/cookie"
	"overdoll/libraries/helpers"
)

type AuthenticateHandler struct{}

func NewAuthenticateHandler() AuthenticateHandler {
	return AuthenticateHandler{}
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
	getCookieResponse, err := r.Services.Eva().CreateAuthenticationCookie(ctx, &eva.CreateAuthenticationCookieRequest{Email: email, Session: string(sessionJson)})

	if err != nil {
		return false, err
	}

	expiration := time.Now().Add(5 * time.Minute)

	// OTP login cookie - will determine if
	// Opened in the same browser - log them in that browser if this cookie exists
	// Otherwise, if opened in another browser (such as the phone), it will log them in on the original browser through a subscription
	_, err = cookie.SetCookie(ctx, &http.Cookie{
		Name:    helpers.OTPKey,
		Value:   getCookieResponse.Cookie,
		Expires: expiration,
	})

	if err != nil {
		return false, err
	}

	return true, err
}
