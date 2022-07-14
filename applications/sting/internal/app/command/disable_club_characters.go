package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/principal"
)

type DisableClubCharacters struct {
	ClubId    string
	Principal *principal.Principal
}

type DisableClubCharactersHandler struct {
	cr club.Repository
}

func NewDisableClubCharactersHandler(cr club.Repository) DisableClubCharactersHandler {
	return DisableClubCharactersHandler{cr: cr}
}

func (h DisableClubCharactersHandler) Handle(ctx context.Context, cmd DisableClubCharacters) (*club.Club, error) {

	clb, err := h.cr.UpdateClubCharacters(ctx, cmd.ClubId, func(club *club.Club) error {
		return club.UpdateDisableClubCharacters(cmd.Principal)
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
