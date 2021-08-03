package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/token"
)

type VerifyAuthenticationToken struct {
	TokenId string
}

type VerifyAuthenticationTokenHandler struct {
	cr token.Repository
	ar account.Repository
}

func NewVerifyAuthenticationTokenHandler(cr token.Repository, ar account.Repository) VerifyAuthenticationTokenHandler {
	return VerifyAuthenticationTokenHandler{cr: cr, ar: ar}
}

func (h VerifyAuthenticationTokenHandler) Handle(ctx context.Context, cmd VerifyAuthenticationToken) error {

	_, err := h.cr.UpdateAuthenticationToken(ctx, cmd.TokenId, func(c *token.AuthenticationToken) error {
		return c.MakeVerified()
	})

	if err != nil {
		return err
	}

	return nil

}
