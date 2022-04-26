package command

import (
	"context"
	"github.com/pkg/errors"
	"overdoll/applications/eva/internal/domain/location"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/libraries/passport"
)

type GrantAuthenticationToken struct {
	Email    string
	Passport *passport.Passport
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

	loc, err := h.lr.GetLocationFromIp(ctx, cmd.Passport.IP())

	if err != nil {
		return nil, err
	}

	// Create an authentication cookie
	// temporary contains the email and secret
	instance, temporary, err := token.NewAuthenticationToken(cmd.Email, loc, cmd.Passport)

	if err != nil {
		return nil, err
	}

	if err := h.cr.CreateAuthenticationToken(ctx, instance); err != nil {
		return nil, err
	}

	if err != nil {
		return nil, err
	}

	// send login token notification
	if err := h.carrier.NewLoginToken(ctx, temporary.Email(), instance.Token(), temporary.Secret()); err != nil {
		return nil, errors.Wrap(err, "failed to send login token email")
	}

	return instance, nil
}
