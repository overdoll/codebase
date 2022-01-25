package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/libraries/principal"
)

type AccountInfractionHistoryById struct {
	Principal *principal.Principal

	AccountId    string
	InfractionId string
}

type AccountInfractionHistoryByIdHandler struct {
	ir club_infraction.Repository
}

func NewAccountInfractionHistoryByIdHandler(ir club_infraction.Repository) AccountInfractionHistoryByIdHandler {
	return AccountInfractionHistoryByIdHandler{ir: ir}
}

func (h AccountInfractionHistoryByIdHandler) Handle(ctx context.Context, query AccountInfractionHistoryById) (*club_infraction.ClubInfractionHistory, error) {

	infractionHistory, err := h.ir.GetAccountInfractionHistoryById(ctx, query.Principal, query.AccountId, query.InfractionId)

	if err != nil {
		return nil, err
	}

	return infractionHistory, nil
}
