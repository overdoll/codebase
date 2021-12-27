package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type BrandBySlug struct {
	Principal *principal.Principal
	Slug      string
}

type ClubBySlugHandler struct {
	pr post.Repository
}

func NewClubBySlugHandler(pr post.Repository) ClubBySlugHandler {
	return ClubBySlugHandler{pr: pr}
}

func (h ClubBySlugHandler) Handle(ctx context.Context, query BrandBySlug) (*post.Club, error) {

	result, err := h.pr.GetClubBySlug(ctx, query.Principal, query.Slug)

	if err != nil {
		return nil, err
	}

	return result, nil
}
