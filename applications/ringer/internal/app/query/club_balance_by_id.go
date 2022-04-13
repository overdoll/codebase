package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/principal"
)

type ClubBalanceById struct {
	Principal *principal.Principal
	Id        string
}

type ClubBalanceByIdHandler struct {
	pr payment.Repository
}

func NewClubBalanceByIdHandlerHandler(pr payment.Repository) ClubBalanceByIdHandler {
	return ClubBalanceByIdHandler{pr: pr}
}

func (h ClubBalanceByIdHandler) Handle(ctx context.Context, query ClubBalanceById) (*payment.Balance, error) {

	result, err := h.pr.GetOrCreateBalanceForClub(ctx, query.Principal, query.Id)

	if err != nil {
		return nil, err
	}

	return result, nil
}
