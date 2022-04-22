package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/balance"
	"overdoll/libraries/principal"
)

type ClubPendingBalanceById struct {
	Principal *principal.Principal
	Id        string
}

type ClubPendingBalanceByIdHandler struct {
	br balance.Repository
}

func NewClubPendingBalanceByIdHandlerHandler(br balance.Repository) ClubPendingBalanceByIdHandler {
	return ClubPendingBalanceByIdHandler{br: br}
}

func (h ClubPendingBalanceByIdHandler) Handle(ctx context.Context, query ClubPendingBalanceById) (*balance.ClubBalance, error) {

	result, err := h.br.GetPendingBalanceForClub(ctx, query.Principal, query.Id)

	if err != nil {
		return nil, err
	}

	return result, nil
}
