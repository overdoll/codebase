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
}

func NewUpdateClubNameHandler(cr club.Repository) UpdateClubNameHandler {
	return UpdateClubNameHandler{cr: cr}
}

func (h UpdateClubNameHandler) Handle(ctx context.Context, cmd UpdateClubName) (*club.Club, error) {

	clb, err := h.cr.UpdateClubName(ctx, cmd.ClubId, func(club *club.Club) error {
		return club.UpdateName(cmd.Principal, cmd.Name)
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
