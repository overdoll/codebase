package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"

	"overdoll/libraries/principal"
)

type AddClubSlugAlias struct {
	Principal *principal.Principal

	ClubId string
	Slug   string
}

type AddClubSlugAliasHandler struct {
	cr club.Repository
}

func NewAddClubSlugAliasHandler(cr club.Repository) AddClubSlugAliasHandler {
	return AddClubSlugAliasHandler{cr: cr}
}

func (h AddClubSlugAliasHandler) Handle(ctx context.Context, cmd AddClubSlugAlias) (*club.Club, error) {

	clb, err := h.cr.UpdateClubSlugAliases(ctx, cmd.ClubId, func(club *club.Club) error {
		return club.AddSlugAlias(cmd.Principal, cmd.Slug)
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
