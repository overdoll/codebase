package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

type AccountTransactionHistory struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	AccountId string
	From      time.Time
	To        *time.Time
}

type AccountTransactionHistoryHandler struct {
	br billing.Repository
}

func NewAccountTransactionHistoryHandler(br billing.Repository) AccountTransactionHistoryHandler {
	return AccountTransactionHistoryHandler{br: br}
}

func (h AccountTransactionHistoryHandler) Handle(ctx context.Context, cmd AccountTransactionHistory) ([]*billing.AccountTransactionHistory, error) {

	filters, err := billing.NewAccountTransactionHistoryFilters(cmd.AccountId, cmd.From, cmd.To)

	if err != nil {
		return nil, err
	}

	accountTransactionHistory, err := h.br.SearchAccountTransactionHistory(ctx, cmd.Principal, cmd.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return accountTransactionHistory, nil
}
