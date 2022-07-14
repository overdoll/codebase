package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/principal"
)

type EnableClubCharacters struct {
	ClubId          string
	CharactersLimit int
	Principal       *principal.Principal
}

type EnableClubCharactersHandler struct {
	cr club.Repository
}

func NewEnableClubCharactersHandler(cr club.Repository) EnableClubCharactersHandler {
	return EnableClubCharactersHandler{cr: cr}
}

func (h EnableClubCharactersHandler) Handle(ctx context.Context, cmd EnableClubCharacters) (*club.Club, error) {

	clb, err := h.cr.UpdateClubCharacters(ctx, cmd.ClubId, func(club *club.Club) error {
		return club.UpdateEnableClubCharacters(cmd.Principal, cmd.CharactersLimit)
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
