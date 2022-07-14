package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/principal"
)

type ClubCharactersCount struct {
	Principal *principal.Principal
	ClubId    string
}

type ClubCharactersCountHandler struct {
	cr club.Repository
}

func NewClubCharactersCountHandler(cr club.Repository) ClubCharactersCountHandler {
	return ClubCharactersCountHandler{cr: cr}
}

func (h ClubCharactersCountHandler) Handle(ctx context.Context, query ClubCharactersCount) (int, error) {
	return h.cr.GetClubCharactersCount(ctx, query.Principal, query.ClubId)
}
