package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/principal"
)

type AccountClubsLimit struct {
	Principal *principal.Principal
	AccountId string
}

type AccountClubsLimitHandler struct {
	cr club.Repository
}

func NewAccountClubsLimitHandler(cr club.Repository) AccountClubsLimitHandler {
	return AccountClubsLimitHandler{cr: cr}
}

func (h AccountClubsLimitHandler) Handle(ctx context.Context, query AccountClubsLimit) (int, error) {
	return club.ViewAccountClubsLimit(query.Principal, query.AccountId)
}
