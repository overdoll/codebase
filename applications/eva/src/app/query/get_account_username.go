package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

type GetAccountUsernameHandler struct {
	ar account.Repository
}

func NewGetAccountUsernameHandler(ar account.Repository) GetAccountUsernameHandler {
	return GetAccountUsernameHandler{ar: ar}
}

var (
	ErrFailedGetUsername = errors.New("failed to get username")
)

func (h GetAccountUsernameHandler) Handle(ctx context.Context, accountId, username string) (*account.Username, error) {

	realUser, err := h.ar.GetAccountUsername(ctx, accountId, username)

	if err != nil {
		zap.S().Errorf("failed to get account email: %s", err)
		return nil, ErrFailedGetEmail
	}

	return realUser, nil
}
