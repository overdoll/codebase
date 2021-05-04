package command

import (
	"context"
	"errors"
	"net/http"

	eva "overdoll/applications/eva/proto"
	"overdoll/applications/hades/src/app"
	"overdoll/applications/hades/src/domain/otp"
	"overdoll/libraries/cookie"
	"overdoll/libraries/helpers"
)

type RegisterHandler struct {
	eva app.EvaService
}

func NewRegisterHandler(eva app.EvaService) RegisterHandler {
	return RegisterHandler{eva: eva}
}

func (h RegisterHandler) Handle(ctx context.Context, username string) (*eva.Session, error) {
	gc := helpers.GinContextFromContext(ctx)

	currentCookie, err := cookie.ReadCookie(ctx, otp.OTPKey)

	if err != nil {

		// Cookie doesn't exist
		if err == http.ErrNoCookie {
			return nil, err
		}
	}

	if currentCookie == nil {
		return nil, errors.New("cannot register - no cookie present")
	}

	sess, err := h.eva.Register(ctx, currentCookie.Value, username)

	if err != nil {
		return nil, err
	}

	http.SetCookie(gc.Writer, &http.Cookie{Name: otp.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	// TODO: set session cookie here

	return sess, err
}
