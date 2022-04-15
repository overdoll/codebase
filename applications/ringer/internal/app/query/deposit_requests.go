package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type DepositRequests struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
}

type DepositRequestsHandler struct {
	par payout.Repository
}

func NewDepositRequestsHandler(par payout.Repository) DepositRequestsHandler {
	return DepositRequestsHandler{par: par}
}

func (h DepositRequestsHandler) Handle(ctx context.Context, query DepositRequests) ([]*payout.DepositRequest, error) {

	results, err := h.par.GetDepositRequests(ctx, query.Principal, query.Cursor)

	if err != nil {
		return nil, err
	}

	return results, nil
}
