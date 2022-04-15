package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type ClubPayoutsByDepositRequest struct {
	Principal        *principal.Principal
	Cursor           *paging.Cursor
	DepositRequestId string
}

type ClubPayoutsByDepositRequestHandler struct {
	par payout.Repository
}

func NewClubPayoutsByDepositRequestHandler(par payout.Repository) ClubPayoutsByDepositRequestHandler {
	return ClubPayoutsByDepositRequestHandler{par: par}
}

func (h ClubPayoutsByDepositRequestHandler) Handle(ctx context.Context, query ClubPayoutsByDepositRequest) ([]*payout.DepositRequest, error) {

	results, err := h.par.GetClubPayoutsByDepositRequest(ctx, query.Principal, query.Cursor, query.DepositRequestId)

	if err != nil {
		return nil, err
	}

	return results, nil
}
