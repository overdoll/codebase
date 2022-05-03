package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type CanDeleteAccountData struct {
	AccountId string
}

type CanDeleteAccountDataHandler struct {
	cr club.Repository
}

func NewCanDeleteAccountDataHandler(cr club.Repository) CanDeleteAccountDataHandler {
	return CanDeleteAccountDataHandler{cr: cr}
}

func (h CanDeleteAccountDataHandler) Handle(ctx context.Context, query CanDeleteAccountData) (bool, error) {

	results, err := h.cr.GetAccountClubsCountOperator(ctx, query.AccountId)

	if err != nil {
		return false, err
	}

	return results == 0, nil
}
