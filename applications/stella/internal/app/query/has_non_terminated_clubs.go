package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/principal"
)

type HasNonTerminatedClubs struct {
	Principal *principal.Principal
	AccountId string
}

type HasNonTerminatedClubsHandler struct {
	cr club.Repository
}

func NewHasNonTerminatedClubsHandler(cr club.Repository) HasNonTerminatedClubsHandler {
	return HasNonTerminatedClubsHandler{cr: cr}
}

func (h HasNonTerminatedClubsHandler) Handle(ctx context.Context, query HasNonTerminatedClubs) (bool, error) {
	return h.cr.HasNonTerminatedClubs(ctx, query.Principal, query.AccountId)
}
