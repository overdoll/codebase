package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

type SearchAccountTransactionHistory struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	AccountId string
	From      time.Time
	To        *time.Time
}

type SearchAccountTransactionHistoryHandler struct {
	br billing.Repository
}

func NewSearchAccountTransactionHistoryHandler(br billing.Repository) SearchAccountTransactionHistoryHandler {
	return SearchAccountTransactionHistoryHandler{br: br}
}

func (h SearchAccountTransactionHistoryHandler) Handle(ctx context.Context, cmd SearchAccountTransactionHistory) ([]*billing.AccountTransactionHistory, error) {

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
