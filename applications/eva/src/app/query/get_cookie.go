package query

import (
	"context"
	"fmt"

	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/libraries/ksuid"
)

type GetCookieHandler struct {
	cr cookie.Repository
}

func NewGetCookieHandler(cr cookie.Repository) GetCookieHandler {
	return GetCookieHandler{cr: cr}
}

func (h GetCookieHandler) Handle(ctx context.Context, id string) (*cookie.Cookie, error) {

	u, err := ksuid.Parse(id)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid: %s", id)
	}

	ck, err := h.cr.GetCookieById(ctx, u)

	if err != nil {
		return nil, fmt.Errorf("could not get cookie: %s", err)
	}

	// make sure cookie is valid
	if ck.IsExpired() {
		return nil, fmt.Errorf("cookie is expired: %s", id)
	}

	return ck, nil
}
