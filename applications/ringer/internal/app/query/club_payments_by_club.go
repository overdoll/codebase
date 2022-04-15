package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type ClubPaymentsByClub struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	ClubId    string
}

type ClubPaymentsByClubHandler struct {
	pr payment.Repository
}

func NewClubPaymentsByClubHandler(pr payment.Repository) ClubPaymentsByClubHandler {
	return ClubPaymentsByClubHandler{pr: pr}
}

func (h ClubPaymentsByClubHandler) Handle(ctx context.Context, query ClubPaymentsByClub) ([]*payment.ClubPayment, error) {

	results, err := h.pr.GetClubPaymentsByClub(ctx, query.Principal, query.Cursor, query.ClubId)

	if err != nil {
		return nil, err
	}

	return results, nil
}
