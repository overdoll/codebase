package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/libraries/paging"
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

func (h GetAccountUsernamesHandler) Handle(ctx context.Context, cursor *paging.Cursor, userId string) ([]*account.Username, *paging.Info, error) {

	usernames, page, err := h.ar.GetAccountUsernames(ctx, cursor, userId)

	if err != nil {

		zap.S().Errorf("failed to get account usernames: %s", err)
		return nil, nil, ErrFailedGetUsernames
	}

	return usernames, page, nil
}
