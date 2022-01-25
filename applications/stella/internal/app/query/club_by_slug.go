package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"

	"overdoll/libraries/principal"
)

type ClubBySlug struct {
	Principal *principal.Principal
	Slug      string
	Suspended bool
}

type ClubBySlugHandler struct {
	cr club.Repository
}

func NewClubBySlugHandler(cr club.Repository) ClubBySlugHandler {
	return ClubBySlugHandler{cr: cr}
}

func (h ClubBySlugHandler) Handle(ctx context.Context, query ClubBySlug) (*club.Club, error) {

	result, err := h.cr.GetClubBySlug(ctx, query.Principal, query.Slug, query.Suspended)

	if err != nil {
		return nil, err
	}

	return result, nil
}
