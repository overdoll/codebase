package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/libraries/paging"
)

var (
	errFailedAccountUsernamesByAccount = errors.New("failed to get account usernames")
)

type AccountUsernamesByAccountHandler struct {
	ar account.Repository
}

func NewAccountUsernamesByAccountHandler(ar account.Repository) AccountUsernamesByAccountHandler {
	return AccountUsernamesByAccountHandler{ar: ar}
}

func (h AccountUsernamesByAccountHandler) Handle(ctx context.Context, cursor *paging.Cursor, accountId string) ([]*account.Username, error) {

	usernames, err := h.ar.GetAccountUsernames(ctx, cursor, accountId)

	if err != nil {
		zap.S().Errorf("failed to get account usernames: %s", err)
		return nil, errFailedAccountUsernamesByAccount
	}

	return usernames, nil
}
