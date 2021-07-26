package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/token"
	"overdoll/libraries/uuid"
)

var (
	errFailedGrantAuthenticationToken = errors.New("failed to grant authentication token")
)

type GrantAuthenticationTokenHandler struct {
	cr      token.Repository
	carrier CarrierService
}

func NewGrantAuthenticationTokenHandler(cr token.Repository, carrier CarrierService) GrantAuthenticationTokenHandler {
	return GrantAuthenticationTokenHandler{cr: cr, carrier: carrier}
}

func (h GrantAuthenticationTokenHandler) Handle(ctx context.Context, email, session string) (*token.AuthenticationToken, error) {

	// Create an authentication cookie
	instance, err := token.NewAuthenticationToken(uuid.New().String(), email, session)

	if err != nil {
		return nil, err
	}

	if err := h.cr.CreateAuthenticationToken(ctx, instance); err != nil {
		zap.S().Errorf("failed to create token: %s", err)
		return nil, errFailedGrantAuthenticationToken
	}

	if err := h.carrier.NewLoginToken(ctx, email, instance.Token()); err != nil {
		return nil, err
	}

	return instance, nil
}
