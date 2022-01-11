package query

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/paging"
)

type SearchAccounts struct {
	Cursor   *paging.Cursor
	Username *string
	SortBy   string
}

type SearchAccountsHandler struct {
	ar account.IndexRepository
}

func NewSearchAccountsHandler(ar account.IndexRepository) SearchAccountsHandler {
	return SearchAccountsHandler{ar: ar}
}

func (h SearchAccountsHandler) Handle(ctx context.Context, query SearchAccounts) ([]*account.Account, error) {

	filters, err := account.NewAccountFilters(query.SortBy, query.Username)

	if err != nil {
		return nil, err
	}

	results, err := h.ar.SearchAccounts(ctx, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return results, nil
}
