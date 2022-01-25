package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"

	"overdoll/libraries/principal"
)

type UpdateClubName struct {
	Principal *principal.Principal

	ClubId string
	Name   string
}

type UpdateClubNameHandler struct {
	cr club.Repository
	ci club.IndexRepository
}

func NewUpdateClubNameHandler(cr club.Repository, ci club.IndexRepository) UpdateClubNameHandler {
	return UpdateClubNameHandler{cr: cr, ci: ci}
}

func (h UpdateClubNameHandler) Handle(ctx context.Context, cmd UpdateClubName) (*club.Club, error) {

	clb, err := h.cr.UpdateClubName(ctx, cmd.ClubId, func(club *club.Club) error {
		return club.UpdateName(cmd.Principal, cmd.Name)
	})

	if err != nil {
		return nil, err
	}

	if err := h.ci.IndexClub(ctx, clb); err != nil {
		return nil, err
	}

	return clb, nil
}
