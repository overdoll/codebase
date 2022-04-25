package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/principal"
)

type AccountPayoutMethodById struct {
	Principal *principal.Principal
	AccountId string
}

type AccountPayoutMethodByIdHandler struct {
	par payout.Repository
}

func NewAccountPayoutMethodsByIdHandler(par payout.Repository) AccountPayoutMethodByIdHandler {
	return AccountPayoutMethodByIdHandler{par: par}
}

func (h AccountPayoutMethodByIdHandler) Handle(ctx context.Context, query AccountPayoutMethodById) (*payout.AccountPayoutMethod, error) {

	results, err := h.par.GetAccountPayoutMethodById(ctx, query.Principal, query.AccountId)

	if err != nil {
		return nil, err
	}

	return results, nil
}
