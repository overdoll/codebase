package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/principal"
)

type BrandBySlug struct {
	Principal *principal.Principal
	Slug      string
}

type ClubBySlugHandler struct {
	cr club.Repository
}

func NewClubBySlugHandler(cr club.Repository) ClubBySlugHandler {
	return ClubBySlugHandler{cr: cr}
}

func (h ClubBySlugHandler) Handle(ctx context.Context, query BrandBySlug) (*club.Club, error) {

	result, err := h.cr.GetClubBySlug(ctx, query.Slug)

	if err != nil {
		return nil, err
	}

	return result, nil
}
