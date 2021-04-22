package command

import (
	"context"
	"fmt"

	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/ksuid"
)

type RedeemCookieHandler struct {
	cr cookie.Repository
	ur user.Repository
}

func NewRedeemCookieHandler(cr cookie.Repository, ur user.Repository) RedeemCookieHandler {
	return RedeemCookieHandler{cr: cr, ur: ur}
}

func (h RedeemCookieHandler) Handle(ctx context.Context, id string) (*cookie.Cookie, error) {

	u, err := ksuid.Parse(id)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid: %s", id)
	}

	ck, err := h.cr.GetCookieById(ctx, u)

	if err != nil {
		return nil, fmt.Errorf("could not get cookie: %s", err)
	}

	// Redeem the cookie
	ck.MakeRedeemed()

	err = h.cr.UpdateCookie(ctx, ck)

	if err != nil {
		return nil, fmt.Errorf("failed to update cookie: %s", err)
	}

	_, err = h.ur.GetUserByEmail(ctx, ck.Email())

	// we weren't able to get our user, so that means that the cookie is not going to be deleted
	if err != nil {
		return ck, nil
	}

	// Delete cookie - user is registered, so we don't need to wait for another call where the user will
	// enter a username, since they already have an account and we can log them in
	err = h.cr.DeleteCookieById(ctx, u)

	if err != nil {
		return nil, fmt.Errorf("failed to delete cookie: %s", err)
	}

	ck.MakeRegistered()

	return ck, nil
}
