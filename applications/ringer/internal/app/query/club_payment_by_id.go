package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/principal"
)

type ClubPaymentById struct {
	Principal *principal.Principal
	Id        string
}

type ClubPaymentByIdHandler struct {
	pr payment.Repository
}

func NewClubPaymentByIdHandler(pr payment.Repository) ClubPaymentByIdHandler {
	return ClubPaymentByIdHandler{pr: pr}
}

func (h ClubPaymentByIdHandler) Handle(ctx context.Context, query ClubPaymentById) (*payment.ClubPayment, error) {

	result, err := h.pr.GetClubPaymentById(ctx, query.Principal, query.Id)

	if err != nil {
		return nil, err
	}

	return result, nil
}
