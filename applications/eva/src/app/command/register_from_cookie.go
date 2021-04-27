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

	ck, err := h.cr.GetCookieById(ctx, cookieId)

	if err != nil {
		return nil, fmt.Errorf("could not get cookie: %s", err)
	}

	// Cookie should have been redeemed at this point, if we are on this command
	if err := ck.MakeConsumed(); err == nil {
		return nil, fmt.Errorf("cookie not valid: %s", err)
	}

	instance, err := user.NewUser(ksuid.New().String(), username, ck.Email())

	if err != nil {
		return nil, fmt.Errorf("bad user %s", err)
	}

	err = h.ur.CreateUser(ctx, instance)

	if err != nil {
		return nil, fmt.Errorf("could not create user %s", err)
	}

	return instance, nil
}
