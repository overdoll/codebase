package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
)

var (
	ErrFailedGetUserInfractionHistory = errors.New("get rejection reasons failed")
)

type UserInfractionHistoryHandler struct {
	ir infraction.Repository
}

func NewUserInfractionHistoryHandler(ir infraction.Repository) UserInfractionHistoryHandler {
	return UserInfractionHistoryHandler{ir: ir}
}

func (h UserInfractionHistoryHandler) Handle(ctx context.Context, id string) ([]*infraction.AccountInfractionHistory, error) {

	history, err := h.ir.GetAccountInfractionHistory(ctx, id)

	if err != nil {
		zap.S().Errorf("failed to get infraction history: %s", err)
		return nil, ErrFailedGetUserInfractionHistory
	}

	return history, nil
}
