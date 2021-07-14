package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

type GetAccountUsernamesHandler struct {
	ar account.Repository
}

func NewGetAccountUsernamesHandler(ar account.Repository) GetAccountUsernamesHandler {
	return GetAccountUsernamesHandler{ar: ar}
}

var (
	ErrFailedGetUsernames = errors.New("failed to get usernames")
)

func (h GetAccountUsernamesHandler) Handle(ctx context.Context, userId string) ([]*account.Username, error) {

	usernames, err := h.ar.GetAccountUsernames(ctx, userId)

	if err != nil {

		zap.S().Errorf("failed to get account usernames: %s", err)
		return nil, ErrFailedGetUsernames
	}

	return usernames, nil
}
