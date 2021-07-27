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
	ur account.Repository
}

func NewVerifyAuthenticationTokenHandler(cr token.Repository, ur account.Repository) VerifyAuthenticationTokenHandler {
	return VerifyAuthenticationTokenHandler{cr: cr, ur: ur}
}

func (h VerifyAuthenticationTokenHandler) Handle(ctx context.Context, cmd VerifyAuthenticationToken) (*token.AuthenticationToken, error) {

	ck, err := h.cr.UpdateAuthenticationToken(ctx, cmd.TokenId, func(c *token.AuthenticationToken) error {
		return c.MakeRedeemed()
	})

	if err != nil {
		return nil, err
	}

	return ck, nil

}
