package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/libraries/principal"
)

type AccountInfractionHistoryById struct {
	Principal *principal.Principal

	AccountId    string
	InfractionId string
}

type AccountInfractionHistoryByIdHandler struct {
	ir infraction.Repository
}

func NewAccountInfractionHistoryByIdHandler(ir infraction.Repository) AccountInfractionHistoryByIdHandler {
	return AccountInfractionHistoryByIdHandler{ir: ir}
}

func (h AccountInfractionHistoryByIdHandler) Handle(ctx context.Context, query AccountInfractionHistoryById) (*infraction.AccountInfractionHistory, error) {

	infractionHistory, err := h.ir.GetAccountInfractionHistoryById(ctx, query.AccountId, query.InfractionId)

	if err != nil {
		return nil, err
	}

	return infractionHistory, nil
}
