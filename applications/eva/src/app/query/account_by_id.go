package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

var (
	ErrFailedAccountByIdHandler = errors.New("failed to get account by id")
)

type AccountByIdHandler struct {
	ur account.Repository
}

func NewAccountByIdHandler(ur account.Repository) AccountByIdHandler {
	return AccountByIdHandler{ur: ur}
}

func (h AccountByIdHandler) Handle(ctx context.Context, id string) (*account.Account, error) {

	ur, err := h.ur.GetAccountById(ctx, id)

	if err != nil {
		zap.S().Errorf("failed to get account by id: %s", err)
		return nil, ErrFailedAccountByIdHandler
	}

	return ur, nil
}
