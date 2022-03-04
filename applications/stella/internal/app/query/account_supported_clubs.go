package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type AccountSupportedClubs struct {
	AccountId string
}

type AccountSupportedClubsHandler struct {
	cr club.Repository
}

func NewAccountSupportedClubsHandler(cr club.Repository) AccountSupportedClubsHandler {
	return AccountSupportedClubsHandler{cr: cr}
}

func (h AccountSupportedClubsHandler) Handle(ctx context.Context, query AccountSupportedClubs) ([]string, error) {

	results, err := h.cr.GetAccountSupportedClubs(ctx, query.AccountId)

	if err != nil {
		return nil, err
	}

	return results, nil
}
