package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

type SearchAccountTransactions struct {
	Principal                          *principal.Principal
	Cursor                             *paging.Cursor
	AccountId                          *string
	AccountClubSupporterSubscriptionId *string
	From                               time.Time
	To                                 *time.Time
	Type                               *string
}

type SearchAccountTransactionsHandler struct {
	br billing.Repository
}

func NewSearchAccountTransactionsHandler(br billing.Repository) SearchAccountTransactionsHandler {
	return SearchAccountTransactionsHandler{br: br}
}

func (h SearchAccountTransactionsHandler) Handle(ctx context.Context, query SearchAccountTransactions) ([]*billing.AccountTransaction, error) {

	filters, err := billing.NewAccountTransactionHistoryFilters(query.AccountId, query.AccountClubSupporterSubscriptionId, query.From, query.To, query.Type)

	if err != nil {
		return nil, err
	}

	accountTransactions, err := h.br.SearchAccountTransactions(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return accountTransactions, nil
}
