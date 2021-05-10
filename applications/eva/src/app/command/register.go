package command

import (
	"context"
	"errors"
	"net/http"

	"go.uber.org/zap"
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

var (
	ErrFailedRegister = errors.New("failed to register")
)

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
			return false, ErrFailedRegister
		}

		zap.S().Errorf("failed to get cookie: %s", err)
		return false, ErrFailedRegister
	}

	cookieId := currentCookie.Value

	ck, err := h.cr.GetCookieById(ctx, cookieId)

	if err != nil {
		zap.S().Errorf("failed to get cookie: %s", err)
		return false, ErrFailedRegister
	}

	// Cookie should have been redeemed at this point, if we are on this command
	if err = ck.MakeConsumed(); err != nil {
		return false, err
	}

	instance, err := user.NewUser(ksuid.New().String(), username, ck.Email())

	if err != nil {
		return false, err
	}

	err = h.ur.CreateUser(ctx, instance)

	// TODO: handle better - if username is taken, etc...
	if err != nil {
		zap.S().Errorf("failed to create user: %s", err)
		return false, ErrFailedRegister
	}

	http.SetCookie(gc.Writer, &http.Cookie{Name: cookie.OTPKey, Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	err = pass.MutatePassport(ctx, func(p *passport.Passport) error {
		p.SetUser(instance.ID())
		return nil
	})

	if err != nil {
		zap.S().Errorf("failed to mutate passport: %s", err)
		return false, ErrFailedRegister
	}

	return true, nil
}
