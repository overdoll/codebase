package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/principal"
)

type UpdateClubCharactersLimit struct {
	ClubId          string
	CharactersLimit int
	Principal       *principal.Principal
}

type UpdateClubCharactersLimitHandler struct {
	cr club.Repository
}

func NewUpdateClubCharactersLimitHandler(cr club.Repository) UpdateClubCharactersLimitHandler {
	return UpdateClubCharactersLimitHandler{cr: cr}
}

func (h UpdateClubCharactersLimitHandler) Handle(ctx context.Context, cmd UpdateClubCharactersLimit) (*club.Club, error) {

	clb, err := h.cr.UpdateClubCharacters(ctx, cmd.ClubId, func(club *club.Club) error {
		return club.UpdateClubCharactersLimit(cmd.Principal, cmd.CharactersLimit)
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
