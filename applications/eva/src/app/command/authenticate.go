package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/token"
	"overdoll/libraries/uuid"
)

type AuthenticateHandler struct {
	cr token.Repository
}

func NewAuthenticateHandler(cr token.Repository) AuthenticateHandler {
	return AuthenticateHandler{cr: cr}
}

var (
	ErrFailedAuthenticate = errors.New("failed to authenticate")
)

func (h AuthenticateHandler) Handle(ctx context.Context, email, session string) (*token.AuthenticationToken, error) {

	// Create an authentication cookie
	instance, err := token.NewAuthenticationToken(uuid.New().String(), email, session)

	if err != nil {
		return nil, err
	}

	if err := h.cr.CreateAuthenticationToken(ctx, instance); err != nil {
		zap.S().Errorf("failed to create cookie: %s", err)
		return nil, ErrFailedAuthenticate
	}

	// TODO: send an email here

	return instance, nil
}
