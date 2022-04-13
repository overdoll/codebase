package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/principal"
)

type ClubPendingBalanceById struct {
	Principal *principal.Principal
	Id        string
}

type ClubPendingBalanceByIdHandler struct {
	pr payment.Repository
}

func NewClubPendingBalanceByIdHandlerHandler(pr payment.Repository) ClubPendingBalanceByIdHandler {
	return ClubPendingBalanceByIdHandler{pr: pr}
}

func (h ClubPendingBalanceByIdHandler) Handle(ctx context.Context, query ClubBalanceById) (*payment.Balance, error) {

	result, err := h.pr.GetOrCreatePendingBalanceForClub(ctx, query.Principal, query.Id)

	if err != nil {
		return nil, err
	}

	return result, nil
}
