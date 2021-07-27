package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/token"
	"overdoll/libraries/uuid"
)

type GrantAuthenticationToken struct {
	Email   string
	Session string
}

type GrantAuthenticationTokenHandler struct {
	cr      token.Repository
	carrier CarrierService
}

func NewGrantAuthenticationTokenHandler(cr token.Repository, carrier CarrierService) GrantAuthenticationTokenHandler {
	return GrantAuthenticationTokenHandler{cr: cr, carrier: carrier}
}

func (h GrantAuthenticationTokenHandler) Handle(ctx context.Context, cmd GrantAuthenticationToken) (*token.AuthenticationToken, error) {

	// Create an authentication cookie
	instance, err := token.NewAuthenticationToken(uuid.New().String(), cmd.Email, cmd.Session)

	if err != nil {
		return nil, err
	}

	if err := h.cr.CreateAuthenticationToken(ctx, instance); err != nil {
		return nil, err
	}

	// send login token notification
	if err := h.carrier.NewLoginToken(ctx, instance.Email(), instance.Token()); err != nil {
		return nil, err
	}

	return instance, nil
}
