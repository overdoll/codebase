package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/balance"
	"overdoll/libraries/principal"
)

type ClubBalanceById struct {
	Principal *principal.Principal
	Id        string
}

type ClubBalanceByIdHandler struct {
	br balance.Repository
}

func NewClubBalanceByIdHandlerHandler(br balance.Repository) ClubBalanceByIdHandler {
	return ClubBalanceByIdHandler{br: br}
}

func (h ClubBalanceByIdHandler) Handle(ctx context.Context, query ClubBalanceById) (*balance.ClubBalance, error) {

	result, err := h.br.GetBalanceForClub(ctx, query.Principal, query.Id)

	if err != nil {
		return nil, err
	}

	return result, nil
}
