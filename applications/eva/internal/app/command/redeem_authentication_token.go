package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/token"
)

var (
	errFailedTokenRedeem = errors.New("failed to redeem cookie")
)

type VerifyAuthenticationTokenHandler struct {
	cr token.Repository
	ur account.Repository
}

func NewVerifyAuthenticationTokenHandler(cr token.Repository, ur account.Repository) VerifyAuthenticationTokenHandler {
	return VerifyAuthenticationTokenHandler{cr: cr, ur: ur}
}

func (h VerifyAuthenticationTokenHandler) Handle(ctx context.Context, cookieId string) (*token.AuthenticationToken, error) {

	ck, err := h.cr.UpdateAuthenticationToken(ctx, cookieId, func(c *token.AuthenticationToken) error {
		return c.MakeRedeemed()
	})

	if err != nil {

		if err == token.ErrTokenNotFound {
			return nil, nil
		}

		zap.S().Errorf("failed to update cookie: %s", err)
		return nil, errFailedTokenRedeem
	}

	return ck, nil

}
