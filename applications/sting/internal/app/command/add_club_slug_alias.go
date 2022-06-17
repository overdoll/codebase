package command

import (
	"context"
	club2 "overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/principal"
)

type AddClubSlugAlias struct {
	Principal *principal.Principal

	ClubId string
	Slug   string
}

type AddClubSlugAliasHandler struct {
	cr club2.Repository
}

func NewAddClubSlugAliasHandler(cr club2.Repository) AddClubSlugAliasHandler {
	return AddClubSlugAliasHandler{cr: cr}
}

func (h AddClubSlugAliasHandler) Handle(ctx context.Context, cmd AddClubSlugAlias) (*club2.Club, error) {

	clb, err := h.cr.UpdateClubSlugAliases(ctx, cmd.ClubId, func(club *club2.Club) error {
		return club.AddSlugAlias(cmd.Principal, cmd.Slug)
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
