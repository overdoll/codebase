package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/principal"
)

type DepositRequestById struct {
	Principal *principal.Principal
	Id        string
}

type DepositRequestByIdHandler struct {
	par payout.Repository
}

func NewDepositRequestByIdHandler(par payout.Repository) DepositRequestByIdHandler {
	return DepositRequestByIdHandler{par: par}
}

func (h DepositRequestByIdHandler) Handle(ctx context.Context, query DepositRequestById) (*payout.DepositRequest, error) {

	result, err := h.par.GetDepositRequestById(ctx, query.Principal, query.Id)

	if err != nil {
		return nil, err
	}

	return result, nil
}
