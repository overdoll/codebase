package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/details"
	"overdoll/libraries/principal"
)

type AccountDetailsById struct {
	Principal *principal.Principal
	AccountId string
}

type AccountDetailsByIdHandler struct {
	ir details.Repository
}

func NewAccountDetailsByIdHandler(ir details.Repository) AccountDetailsByIdHandler {
	return AccountDetailsByIdHandler{ir: ir}
}

func (h AccountDetailsByIdHandler) Handle(ctx context.Context, query AccountDetailsById) (*details.AccountDetails, error) {

	result, err := h.ir.GetAccountDetailsById(ctx, query.Principal, query.AccountId)

	if err != nil {
		return nil, err
	}

	return result, nil
}
