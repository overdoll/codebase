package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type AccountInfractionHistory struct {
	Principal *principal.Principal

	Cursor    *paging.Cursor
	AccountId string
}

type AccountInfractionHistoryByAccountHandler struct {
	ir club_infraction.Repository
}

func NewAccountInfractionHistoryByAccountHandler(ir club_infraction.Repository) AccountInfractionHistoryByAccountHandler {
	return AccountInfractionHistoryByAccountHandler{ir: ir}
}

func (h AccountInfractionHistoryByAccountHandler) Handle(ctx context.Context, query AccountInfractionHistory) ([]*club_infraction.ClubInfractionHistory, error) {

	history, err := h.ir.GetAccountInfractionHistory(ctx, query.Principal, query.Cursor, query.AccountId)

	if err != nil {
		return nil, err
	}

	return history, nil
}
