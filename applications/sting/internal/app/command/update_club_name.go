package command

import (
	"context"
	club2 "overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/principal"
)

type UpdateClubName struct {
	Principal *principal.Principal

	ClubId string
	Name   string
}

type UpdateClubNameHandler struct {
	cr club2.Repository
}

func NewUpdateClubNameHandler(cr club2.Repository) UpdateClubNameHandler {
	return UpdateClubNameHandler{cr: cr}
}

func (h UpdateClubNameHandler) Handle(ctx context.Context, cmd UpdateClubName) (*club2.Club, error) {

	clb, err := h.cr.UpdateClubName(ctx, cmd.ClubId, func(club *club2.Club) error {
		return club.UpdateName(cmd.Principal, cmd.Name)
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
