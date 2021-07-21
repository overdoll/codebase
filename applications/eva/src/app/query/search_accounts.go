package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/libraries/paging"
)

var (
	errFailedSearchAccount = errors.New("failed to search accounts")
)

type SearchAccountsHandler struct {
	ar account.IndexRepository
}

func NewSearchAccountsHandler(ar account.IndexRepository) SearchAccountsHandler {
	return SearchAccountsHandler{ar: ar}
}

func (h SearchAccountsHandler) Handle(ctx context.Context, cursor *paging.Cursor, username string, isArtist bool) ([]*account.Account, error) {

	results, err := h.ar.SearchAccounts(ctx, cursor, username, isArtist)

	if err != nil {
		zap.S().Errorf("failed to search accounts: %s", err)
		return nil, errFailedSearchAccount
	}

	return results, nil
}
