package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/libraries/uuid"
)

type CreateAccountWithAuthenticationToken struct {
	TokenId  string
	Username string
}

type CreateAccountWithAuthenticationTokenHandler struct {
	cr token.Repository
	ur account.Repository
}

func NewCreateAccountWithAuthenticationTokenHandler(cr token.Repository, ur account.Repository) CreateAccountWithAuthenticationTokenHandler {
	return CreateAccountWithAuthenticationTokenHandler{cr: cr, ur: ur}
}

func (h CreateAccountWithAuthenticationTokenHandler) Handle(ctx context.Context, cmd CreateAccountWithAuthenticationToken) (*account.Account, error) {

	ck, err := h.cr.GetAuthenticationTokenById(ctx, cmd.TokenId)

	if err != nil {
		return nil, err
	}

	// AuthenticationToken should have been redeemed at this point, if we are on this command
	if err := ck.MakeConsumed(); err != nil {
		return nil, err
	}

	instance, err := account.NewAccount(uuid.New().String(), cmd.Username, ck.Email())

	if err != nil {
		return nil, err
	}

	if err := h.ur.CreateAccount(ctx, instance); err != nil {
		return nil, err
	}

	if err := h.cr.DeleteAuthenticationTokenById(ctx, ck.Token()); err != nil {
		return nil, err
	}

	return instance, nil
}
