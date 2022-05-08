package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchClubPayouts struct {
	Principal        *principal.Principal
	Cursor           *paging.Cursor
	ClubId           *string
	Status           []string
	DepositRequestId *string
}

type SearchClubPayoutsHandler struct {
	pir payout.Repository
}

func NewSearchClubPayoutsHandler(pir payout.Repository) SearchClubPayoutsHandler {
	return SearchClubPayoutsHandler{pir: pir}
}

func (h SearchClubPayoutsHandler) Handle(ctx context.Context, query SearchClubPayouts) ([]*payout.ClubPayout, error) {

	filters, err := payout.NewClubPayoutsFilters(query.DepositRequestId, query.ClubId, query.Status)

	if err != nil {
		return nil, err
	}

	results, err := h.pir.SearchClubPayouts(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return results, nil
}
