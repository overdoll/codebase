package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/token"
)

type GetAuthenticationTokenHandler struct {
	tk token.Repository
}

func NewGetAuthenticationTokenHandler(tk token.Repository) GetAuthenticationTokenHandler {
	return GetAuthenticationTokenHandler{tk: tk}
}

var (
	ErrFailedGetToken = errors.New("failed to get authentication token")
)

func (h GetAuthenticationTokenHandler) Handle(ctx context.Context, id string) (*token.AuthenticationToken, error) {

	tk, err := h.tk.GetAuthenticationTokenById(ctx, id)

	if err != nil {

		if err == token.ErrTokenNotFound {
			return nil, nil
		}

		zap.S().Errorf("failed to get token: %s", err)
		return nil, ErrFailedGetToken
	}

	return tk, nil
}
