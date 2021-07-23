package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

var (
	errFailedAccountsByIdHandler = errors.New("failed to get accounts by id")
)

type AccountsByIdHandler struct {
	ur account.Repository
}

func NewAccountsByIdHandler(ur account.Repository) AccountsByIdHandler {
	return AccountsByIdHandler{ur: ur}
}

func (h AccountsByIdHandler) Handle(ctx context.Context, ids []string) ([]*account.Account, error) {

	accs, err := h.ur.GetAccountsById(ctx, ids)

	if err != nil {
		zap.S().Errorf("failed to get account by id: %s", err)
		return nil, errFailedAccountsByIdHandler
	}

	return accs, nil
}
