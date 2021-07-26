package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/internal/domain/account"
)

var (
	errFailedAccountByUsernameHandler = errors.New("failed to get account by username")
)

type AccountByUsernameHandler struct {
	ur account.Repository
}

func NewAccountByUsernameHandler(ur account.Repository) AccountByUsernameHandler {
	return AccountByUsernameHandler{ur: ur}
}

func (h AccountByUsernameHandler) Handle(ctx context.Context, username string) (*account.Account, error) {

	ur, err := h.ur.GetAccountByUsername(ctx, username)

	if err != nil {
		zap.S().Errorf("failed to get account by username: %s", err)
		return nil, errFailedAccountByUsernameHandler
	}

	return ur, nil
}
