package command

import (
	"context"
	"fmt"

	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/ksuid"
)

type RegisterFromCookieHandler struct {
	cr cookie.Repository
	ur user.Repository
}

func NewRegisterFromCookieHandler(cr cookie.Repository, ur user.Repository) RegisterFromCookieHandler {
	return RegisterFromCookieHandler{cr: cr, ur: ur}
}

func (h RegisterFromCookieHandler) Handle(ctx context.Context, cookieId string, username string) (*user.User, error) {

	u, err := ksuid.Parse(cookieId)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid: %s", cookieId)
	}

	ck, err := h.cr.GetCookieById(ctx, u)

	if err != nil {
		return nil, fmt.Errorf("could not get cookie: %s", err)
	}

	if !ck.Redeemed() {
		return nil, fmt.Errorf("cookie not yet redeemed")
	}

	if !ck.IsExpired() {
		return nil, fmt.Errorf("cookie is expired")
	}

	instance, err := user.NewUser(ksuid.New(), username, ck.Email())

	if err != nil {
		return nil, fmt.Errorf("cookie is expired %s", err)
	}

	err = h.ur.CreateUser(ctx, instance)

	if err != nil {
		return nil, fmt.Errorf("could not create user %s", err)
	}

	return instance, nil
}
