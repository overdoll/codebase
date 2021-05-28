package mutations

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"strings"
	"time"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/app/command"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/cookies"
	"overdoll/libraries/helpers"
)

type MutationResolver struct {
	App *app.Application
}

// Authenticate - Generate an OTP code that will be used to authenticate the user
// if user opens the link in the same browser, then we automatically authorize them
// if not, then we redeem the cookie and the original browser should be logged in,
// provided that the tab is still open
func (r *MutationResolver) Authenticate(ctx context.Context, data *types.AuthenticationInput) (bool, error) {

	gc := helpers.GinContextFromContext(ctx)

	// Capture session data
	type SessionData struct {
		UserAgent string `json:"user-agent"`
	}

	sessionData := SessionData{UserAgent: strings.Join(gc.Request.Header["User-Agent"], ",")}

	sessionJson, err := json.Marshal(sessionData)

	if err != nil {
		zap.S().Errorf("failed to unmarshal: %s", err)
		return false, errors.New("error")
	}

	instance, err := r.App.Commands.Authenticate.Handle(ctx, data.Email, string(sessionJson))

	if err != nil {
		return false, nil
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
		zap.S().Errorf("failed to set cookie: %s", err)
		return false, command.ErrFailedAuthenticate
	}

	return true, nil
}

func (r *MutationResolver) Register(ctx context.Context, data *types.RegisterInput) (bool, error) {
	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := cookies.ReadCookie(ctx, cookie.OTPKey)

	if err != nil {

		// Cookie doesn't exist
		if err == http.ErrNoCookie {
			return false, command.ErrFailedRegister
		}

		zap.S().Errorf("failed to get cookie: %s", err)
		return false, command.ErrFailedRegister
	}

	res, err := r.App.Commands.Register.Handle(ctx, currentCookie.Value, data.Username)

	if err != nil {
		return false, err
	}

	http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	return res, err
}

func (r *MutationResolver) Logout(ctx context.Context) (bool, error) {
	return r.App.Commands.Logout.Handle(ctx)
}
