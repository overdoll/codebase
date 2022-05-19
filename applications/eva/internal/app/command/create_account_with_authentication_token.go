package command

import (
	"context"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/libraries/passport"
)

type CreateAccountWithAuthenticationToken struct {
	Token    string
	Username string
	Passport *passport.Passport
}

type CreateAccountWithAuthenticationTokenHandler struct {
	cr token.Repository
	ur account.Repository
}

func NewCreateAccountWithAuthenticationTokenHandler(cr token.Repository, ur account.Repository) CreateAccountWithAuthenticationTokenHandler {
	return CreateAccountWithAuthenticationTokenHandler{cr: cr, ur: ur}
}

func (h CreateAccountWithAuthenticationTokenHandler) Handle(ctx context.Context, cmd CreateAccountWithAuthenticationToken) (*account.Account, error) {

	ck, err := h.cr.GetAuthenticationToken(ctx, cmd.Passport, cmd.Token, nil)

	if err != nil {
		return nil, err
	}

	em, err := ck.ViewEmailWithPassport(cmd.Passport)

	if err != nil {
		return nil, err
	}

	// use the unique id of the token to create the account
	// this ensures our operations are idempotent
	instance, err := account.NewAccount(ck.UniqueId(), cmd.Username, em)

	if err != nil {
		return nil, err
	}

	if err := h.ur.CreateAccount(ctx, instance); err != nil {
		return nil, err
	}

	if err := h.cr.DeleteAuthenticationToken(ctx, cmd.Passport, cmd.Token, nil); err != nil {
		return nil, err
	}

	return instance, nil
}
