package command

import (
	"context"
	"overdoll/applications/eva/internal/domain/location"
	"overdoll/libraries/translations"

	"overdoll/applications/eva/internal/domain/token"
	"overdoll/libraries/uuid"
)

type GrantAuthenticationToken struct {
	Email     string
	UserAgent string
	IP        string
	Language  *translations.Language
}

type GrantAuthenticationTokenHandler struct {
	cr      token.Repository
	lr      location.Repository
	carrier CarrierService
}

func NewGrantAuthenticationTokenHandler(cr token.Repository, lr location.Repository, carrier CarrierService) GrantAuthenticationTokenHandler {
	return GrantAuthenticationTokenHandler{cr: cr, carrier: carrier, lr: lr}
}

func (h GrantAuthenticationTokenHandler) Handle(ctx context.Context, cmd GrantAuthenticationToken) (*token.AuthenticationToken, error) {

	loc, err := h.lr.GetLocationFromIp(ctx, cmd.IP)

	if err != nil {
		return nil, err
	}

	// Create an authentication cookie
	instance, err := token.NewAuthenticationToken(uuid.New().String(), cmd.Email, cmd.UserAgent, loc)

	if err != nil {
		return nil, err
	}

	if err := h.cr.CreateAuthenticationToken(ctx, instance); err != nil {
		return nil, err
	}

	// send login token notification
	if err := h.carrier.NewLoginToken(ctx, instance.Email(), instance.Token(), cmd.Language.Locale()); err != nil {
		return nil, err
	}

	return instance, nil
}
