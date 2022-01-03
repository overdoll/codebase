package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/principal"
)

type AddClubSlugAlias struct {
	Principal *principal.Principal

	ClubId string
	Slug   string
}

type AddClubSlugAliasHandler struct {
	cr club.Repository
	ci club.IndexRepository
}

func NewAddClubSlugAliasHandler(cr club.Repository, ci club.IndexRepository) AddClubSlugAliasHandler {
	return AddClubSlugAliasHandler{cr: cr, ci: ci}
}

func (h AddClubSlugAliasHandler) Handle(ctx context.Context, cmd AddClubSlugAlias) (*club.Club, error) {

	clb, err := h.cr.UpdateClubSlugAliases(ctx, cmd.Principal, cmd.ClubId, func(club *club.Club) error {
		return club.AddSlugAlias(cmd.Principal, cmd.Slug)
	})

	if err != nil {
		return nil, err
	}

	if err := h.ci.IndexClub(ctx, clb); err != nil {
		return nil, err
	}

	return clb, nil
}
