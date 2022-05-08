package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchClubPayments struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	ClubId    *string
	Status    []string
	PayoutId  *string
}

type SearchClubPaymentsHandler struct {
	pr payment.Repository
}

func NewSearchClubPaymentsHandler(pr payment.Repository) SearchClubPaymentsHandler {
	return SearchClubPaymentsHandler{pr: pr}
}

func (h SearchClubPaymentsHandler) Handle(ctx context.Context, query SearchClubPayments) ([]*payment.ClubPayment, error) {

	filters, err := payment.NewClubPaymentsFilters(query.PayoutId, query.ClubId, query.Status)

	if err != nil {
		return nil, err
	}

	results, err := h.pr.SearchClubPayments(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return results, nil
}
