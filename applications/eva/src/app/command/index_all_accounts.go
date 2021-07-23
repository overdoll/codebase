package command

import (
	"context"

	"overdoll/applications/eva/src/domain/account"
)

type IndexAllAccountsHandler struct {
	ar account.Repository
	ai account.IndexRepository
}

func NewIndexAllAccountsHandler(ar account.Repository, ai account.IndexRepository) IndexAllAccountsHandler {
	return IndexAllAccountsHandler{ar: ar, ai: ai}
}

func (h IndexAllAccountsHandler) Handle(ctx context.Context) error {

	if err := h.ai.DeleteAccountIndex(ctx); err != nil {
		return err
	}

	return h.ai.IndexAllAccounts(ctx)
}
