package command

import (
	"context"
	"overdoll/libraries/passport"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/token"
)

type VerifyAuthenticationToken struct {
	Passport *passport.Passport
	Token    string
	Secret   string
}

type VerifyAuthenticationTokenHandler struct {
	cr token.Repository
	ar account.Repository
}

func NewVerifyAuthenticationTokenHandler(cr token.Repository, ar account.Repository) VerifyAuthenticationTokenHandler {
	return VerifyAuthenticationTokenHandler{cr: cr, ar: ar}
}

func (h VerifyAuthenticationTokenHandler) Handle(ctx context.Context, cmd VerifyAuthenticationToken) error {

	_, err := h.cr.UpdateAuthenticationToken(ctx, cmd.Passport, cmd.Token, cmd.Secret, func(c *token.AuthenticationToken) error {
		return c.MakeVerified(cmd.Passport, cmd.Secret)
	})

	if err != nil {
		return err
	}

	return nil

}
