package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type AccountInfractionHistory struct {
	Principal *principal.Principal

	Cursor    *paging.Cursor
	AccountId string
}

type AccountInfractionHistoryByAccountHandler struct {
	ir infraction.Repository
}

func NewAccountInfractionHistoryByAccountHandler(ir infraction.Repository) AccountInfractionHistoryByAccountHandler {
	return AccountInfractionHistoryByAccountHandler{ir: ir}
}

func (h AccountInfractionHistoryByAccountHandler) Handle(ctx context.Context, query AccountInfractionHistory) ([]*infraction.AccountInfractionHistory, error) {

	history, err := h.ir.GetAccountInfractionHistory(ctx, query.Cursor, query.AccountId)

	if err != nil {
		return nil, err
	}

	return history, nil
}
