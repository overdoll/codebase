package command

import (
	"context"
	"overdoll/libraries/passport"
	"overdoll/libraries/translations"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/libraries/uuid"
)

type CreateAccountWithAuthenticationToken struct {
	Token    string
	Username string
	Passport *passport.Passport
	Language *translations.Language
}

type CreateAccountWithAuthenticationTokenHandler struct {
	cr token.Repository
	ur account.Repository
}

func NewCreateAccountWithAuthenticationTokenHandler(cr token.Repository, ur account.Repository) CreateAccountWithAuthenticationTokenHandler {
	return CreateAccountWithAuthenticationTokenHandler{cr: cr, ur: ur}
}

func (h CreateAccountWithAuthenticationTokenHandler) Handle(ctx context.Context, cmd CreateAccountWithAuthenticationToken) (*account.Account, error) {

	ck, err := h.cr.GetAuthenticationToken(ctx, cmd.Token)

	if err != nil {
		return nil, err
	}

	em, err := ck.Email(cmd.Passport)

	if err != nil {
		return nil, err
	}

	instance, err := account.NewAccount(cmd.Language, uuid.New().String(), cmd.Username, em)

	if err != nil {
		return nil, err
	}

	if err := h.ur.CreateAccount(ctx, instance); err != nil {
		return nil, err
	}

	if err := h.cr.DeleteAuthenticationToken(ctx, cmd.Passport, ck.Token()); err != nil {
		return nil, err
	}

	return instance, nil
}
