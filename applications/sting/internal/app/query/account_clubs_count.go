package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/principal"
)

type AccountClubsCount struct {
	Principal *principal.Principal
	AccountId string
}

type AccountClubsCountHandler struct {
	cr club.Repository
}

func NewAccountClubsCountHandler(cr club.Repository) AccountClubsCountHandler {
	return AccountClubsCountHandler{cr: cr}
}

func (h AccountClubsCountHandler) Handle(ctx context.Context, query AccountClubsCount) (int, error) {

	results, err := h.cr.GetAccountClubsCount(ctx, query.Principal, query.AccountId)

	if err != nil {
		return 0, err
	}

	return results, nil
}
