package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/multi_factor"
)

type RedeemCookieHandler struct {
	cr cookie.Repository
	ur account.Repository
	mr multi_factor.Repository
}

func NewRedeemCookieHandler(cr cookie.Repository, ur account.Repository) RedeemCookieHandler {
	return RedeemCookieHandler{cr: cr, ur: ur}
}

var (
	ErrFailedCookieRedeem = errors.New("failed to redeem cookie")
)

func (h RedeemCookieHandler) Handle(ctx context.Context, cookieId string) (*cookie.Cookie, error) {

	ck, err := h.cr.UpdateCookie(ctx, cookieId, func(c *cookie.Cookie) error {
		return c.MakeRedeemed()
	})

	if err != nil {

		if err == cookie.ErrCookieNotFound {
			return nil, nil
		}

		zap.S().Errorf("failed to update cookie: %s", err)
		return nil, ErrFailedCookieRedeem
	}

	return ck, nil

}
