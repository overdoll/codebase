package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type AccountPayoutMethodsByAccount struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	AccountId string
}

type AccountPayoutMethodsByAccountHandler struct {
	par payout.Repository
}

func NewAccountPayoutMethodsByAccountHandler(par payout.Repository) AccountPayoutMethodsByAccountHandler {
	return AccountPayoutMethodsByAccountHandler{par: par}
}

func (h AccountPayoutMethodsByAccountHandler) Handle(ctx context.Context, query AccountPayoutMethodsByAccount) ([]*payout.AccountPayoutMethod, error) {

	results, err := h.par.GetAccountPayoutMethods(ctx, query.Principal, query.Cursor, query.AccountId)

	if err != nil {
		return nil, err
	}

	return results, nil
}
