package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/principal"
)

type ClubPayoutById struct {
	Principal *principal.Principal
	Id        string
}

type ClubPayoutByIdHandler struct {
	par payout.Repository
}

func NewClubPayoutByIdHandler(par payout.Repository) ClubPayoutByIdHandler {
	return ClubPayoutByIdHandler{par: par}
}

func (h ClubPayoutByIdHandler) Handle(ctx context.Context, query ClubPayoutById) (*payout.ClubPayout, error) {

	result, err := h.par.GetClubPayoutById(ctx, query.Principal, query.Id)

	if err != nil {
		return nil, err
	}

	return result, nil
}
