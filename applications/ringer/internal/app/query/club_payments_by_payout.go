package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type ClubPaymentsByPayout struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	PayoutId  string
}

type ClubPaymentsByPayoutHandler struct {
	pr payment.Repository
}

func NewClubPaymentsByPayoutHandler(pr payment.Repository) ClubPaymentsByPayoutHandler {
	return ClubPaymentsByPayoutHandler{pr: pr}
}

func (h ClubPaymentsByPayoutHandler) Handle(ctx context.Context, query ClubPaymentsByPayout) ([]*payment.ClubPayment, error) {

	results, err := h.pr.GetClubPaymentsByPayout(ctx, query.Principal, query.Cursor, query.PayoutId)

	if err != nil {
		return nil, err
	}

	return results, nil
}
