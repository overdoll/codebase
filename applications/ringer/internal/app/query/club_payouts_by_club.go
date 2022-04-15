package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type ClubPayoutsByClub struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	ClubId    string
}

type ClubPayoutsByClubHandler struct {
	par payout.Repository
}

func NewClubPayoutsByClubHandler(par payout.Repository) ClubPayoutsByClubHandler {
	return ClubPayoutsByClubHandler{par: par}
}

func (h ClubPayoutsByClubHandler) Handle(ctx context.Context, query ClubPayoutsByClub) ([]*payout.ClubPayout, error) {

	results, err := h.par.GetClubPayoutsByClub(ctx, query.Principal, query.Cursor, query.ClubId)

	if err != nil {
		return nil, err
	}

	return results, nil
}
