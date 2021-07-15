package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/multi_factor"
	"overdoll/applications/eva/src/domain/token"
)

type RedeemAuthenticationTokenHandler struct {
	cr token.Repository
	ur account.Repository
	mr multi_factor.Repository
}

func NewRedeemAuthenticationTokenHandler(cr token.Repository, ur account.Repository) RedeemAuthenticationTokenHandler {
	return RedeemAuthenticationTokenHandler{cr: cr, ur: ur}
}

var (
	ErrFailedTokenRedeem = errors.New("failed to redeem cookie")
)

func (h RedeemAuthenticationTokenHandler) Handle(ctx context.Context, cookieId string) (*token.AuthenticationToken, error) {

	ck, err := h.cr.UpdateAuthenticationToken(ctx, cookieId, func(c *token.AuthenticationToken) error {
		return c.MakeRedeemed()
	})

	if err != nil {

		if err == token.ErrTokenNotFound {
			return nil, nil
		}

		zap.S().Errorf("failed to update cookie: %s", err)
		return nil, ErrFailedTokenRedeem
	}

	return ck, nil

}
