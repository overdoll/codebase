package command

import (
	"context"
	"overdoll/applications/eva/internal/domain/location"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/passport"
)

type GrantAuthenticationToken struct {
	Email    string
	Method   string
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

	var method token.Method
	if cmd.Method != "" {
		method, err = token.MethodFromString(cmd.Method)
		if err != nil {
			return nil, err
		}
	} else {
		method = token.MagicLink
	}

	var temporary *token.TemporaryState
	var instance *token.AuthenticationToken
	var isCode bool

	switch method {
	case token.MagicLink:
		instance, temporary, err = token.NewAuthenticationTokenMagicLink(cmd.Email, loc, cmd.Passport)
		if err != nil {
			return nil, err
		}
		break
	case token.Code:
		isCode = true
		instance, temporary, err = token.NewAuthenticationTokenCode(cmd.Email, loc, cmd.Passport)
		if err != nil {
			return nil, err
		}
		break
	default:
		return nil, domainerror.NewValidation("invalid token type")
	}

	if err != nil {
		return nil, err
	}

	if err := h.cr.CreateAuthenticationToken(ctx, instance, temporary); err != nil {
		return nil, err
	}

	if err != nil {
		return nil, err
	}

	// send login token notification
	if err := h.carrier.NewLoginToken(ctx, temporary.Email(), instance.Token(), temporary.Secret(), isCode); err != nil {
		return nil, err
	}

	return instance, nil
}
