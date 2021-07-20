package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

var (
	ErrFailedAccountByEmailHandler = errors.New("failed to get account from email")
)

type AccountByEmailHandler struct {
	ur account.Repository
}

func NewAccountByEmailHandler(ur account.Repository) AccountByEmailHandler {
	return AccountByEmailHandler{ur: ur}
}

func (h AccountByEmailHandler) Handle(ctx context.Context, email string) (*account.Account, error) {

	acc, err := h.ur.GetAccountByEmail(ctx, email)

	if err != nil {
		zap.S().Errorf("failed to get account by email: %s", err)
		return nil, ErrFailedAccountByEmailHandler
	}

	return acc, nil
}
