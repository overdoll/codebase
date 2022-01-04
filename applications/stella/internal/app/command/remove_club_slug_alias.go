package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/principal"
)

type RemoveClubSlugAlias struct {
	Principal *principal.Principal

	ClubId string
	Slug   string
}

type RemoveClubSlugAliasHandler struct {
	cr club.Repository
	ci club.IndexRepository
}

func NewRemoveClubSlugAliasHandler(cr club.Repository, ci club.IndexRepository) RemoveClubSlugAliasHandler {
	return RemoveClubSlugAliasHandler{cr: cr, ci: ci}
}

func (h RemoveClubSlugAliasHandler) Handle(ctx context.Context, cmd RemoveClubSlugAlias) (*club.Club, error) {

	clb, err := h.cr.UpdateClubSlugAliases(ctx, cmd.Principal, cmd.ClubId, func(club *club.Club) error {
		return club.RemoveSlugAlias(cmd.Principal, cmd.Slug)
	})

	if err != nil {
		return nil, err
	}

	if err := h.ci.IndexClub(ctx, clb); err != nil {
		return nil, err
	}

	return clb, nil
}
