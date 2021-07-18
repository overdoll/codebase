package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/libraries/paging"
)

var (
	ErrFailedGetUserInfractionHistory = errors.New("get rejection reasons failed")
)

type AccountInfractionHistoryHandler struct {
	ir infraction.Repository
}

func NewAccountInfractionHistoryHandler(ir infraction.Repository) AccountInfractionHistoryHandler {
	return AccountInfractionHistoryHandler{ir: ir}
}

func (h AccountInfractionHistoryHandler) Handle(ctx context.Context, cursor *paging.Cursor, id string) ([]*infraction.AccountInfractionHistory, *paging.Info, error) {

	history, page, err := h.ir.GetAccountInfractionHistory(ctx, cursor, id)

	if err != nil {
		zap.S().Errorf("failed to get infraction history: %s", err)
		return nil, nil, ErrFailedGetUserInfractionHistory
	}

	return history, page, nil
}
