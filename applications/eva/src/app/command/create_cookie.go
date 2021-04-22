package command

import (
	"context"

	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/libraries/ksuid"
)

type CreateCookieHandler struct {
	cr cookie.Repository
}

func NewCreateCookieHandler(cr cookie.Repository) CreateCookieHandler {
	return CreateCookieHandler{cr: cr}
}

func (h CreateCookieHandler) Handle(ctx context.Context, email string, session string) (*cookie.Cookie, error) {

	// Create a new cookie
	instance, err := cookie.NewCookie(ksuid.New(), email)

	if err != nil {
		return nil, err
	}

	// Set session variable
	instance.SetSession(session)

	ck, err := h.cr.CreateCookie(ctx, instance)

	if err != nil {
		return nil, err
	}

	return ck, nil
}
