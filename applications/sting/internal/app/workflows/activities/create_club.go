package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
)

type CreateClubInput struct {
	ClubId         string
	Slug           string
	Name           string
	OwnerAccountId string
}

func (h *Activities) CreateClub(ctx context.Context, input CreateClubInput) error {

	clb := club.NewMustClub(input.ClubId, input.Slug, input.Name, input.OwnerAccountId)

	if err := h.cr.CreateClub(ctx, clb); err != nil {
		return err
	}

	return nil
}
