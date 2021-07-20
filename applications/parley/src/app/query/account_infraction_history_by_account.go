package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/libraries/paging"
)

var (
	errFailedGetAccountInfractionHistoryByAccount = errors.New("get rejection reasons failed")
)

type AccountInfractionHistoryByAccountHandler struct {
	ir infraction.Repository
}

func NewAccountInfractionHistoryByAccountHandler(ir infraction.Repository) AccountInfractionHistoryByAccountHandler {
	return AccountInfractionHistoryByAccountHandler{ir: ir}
}

func (h AccountInfractionHistoryByAccountHandler) Handle(ctx context.Context, cursor *paging.Cursor, accountId string) ([]*infraction.AccountInfractionHistory, *paging.Info, error) {

	history, page, err := h.ir.GetAccountInfractionHistory(ctx, cursor, accountId)

	if err != nil {
		zap.S().Errorf("failed to get infraction history: %s", err)
		return nil, nil, errFailedGetAccountInfractionHistoryByAccount
	}

	return history, page, nil
}
