package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/libraries/uuid"
)

type AuthenticateHandler struct {
	cr cookie.Repository
}

func NewAuthenticateHandler(cr cookie.Repository) AuthenticateHandler {
	return AuthenticateHandler{cr: cr}
}

var (
	ErrFailedAuthenticate = errors.New("failed to authenticate")
)

func (h AuthenticateHandler) Handle(ctx context.Context, email, session string) (*cookie.Cookie, error) {

	// Create an authentication cookie
	instance, err := cookie.NewCookie(uuid.New().String(), email, session)

	if err != nil {
		return nil, err
	}

	err = h.cr.CreateCookie(ctx, instance)

	if err != nil {
		zap.S().Errorf("failed to create cookie: %s", err)
		return nil, ErrFailedAuthenticate
	}

	return instance, nil
}
