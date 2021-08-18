package query

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/paging"
)

type SearchAccounts struct {
	Cursor   *paging.Cursor
	Username string
}

type SearchAccountsHandler struct {
	ar account.IndexRepository
}

func NewSearchAccountsHandler(ar account.IndexRepository) SearchAccountsHandler {
	return SearchAccountsHandler{ar: ar}
}

func (h SearchAccountsHandler) Handle(ctx context.Context, query SearchAccounts) ([]*account.Account, error) {

	results, err := h.ar.SearchAccounts(ctx, query.Cursor, query.Username)

	if err != nil {
		return nil, err
	}

	return results, nil
}
