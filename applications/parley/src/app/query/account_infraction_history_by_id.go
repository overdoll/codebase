package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
)

var (
	ErrFailedGetUserInfractionHistoryForAccount = errors.New("get infraction history for account failed")
)

type AccountInfractionHistoryByIdHandler struct {
	ir infraction.Repository
}

func NewAccountInfractionHistoryByIdHandler(ir infraction.Repository) AccountInfractionHistoryByIdHandler {
	return AccountInfractionHistoryByIdHandler{ir: ir}
}

func (h AccountInfractionHistoryByIdHandler) Handle(ctx context.Context, accountId, id string) (*infraction.AccountInfractionHistory, error) {

	infractionHistory, err := h.ir.GetAccountInfractionHistoryById(ctx, accountId, id)

	if err != nil {
		zap.S().Errorf("failed to get infraction history: %s", err)
		return nil, ErrFailedGetUserInfractionHistoryForAccount
	}

	return infractionHistory, nil
}
