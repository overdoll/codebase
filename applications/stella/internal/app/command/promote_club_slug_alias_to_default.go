package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"

	"overdoll/libraries/principal"
)

type PromoteClubSlugAliasToDefault struct {
	Principal *principal.Principal

	ClubId string
	Slug   string
}

type PromoteClubSlugAliasToDefaultHandler struct {
	cr club.Repository
	ci club.IndexRepository
}

func NewPromoteClubSlugAliasToDefaultHandler(cr club.Repository, ci club.IndexRepository) PromoteClubSlugAliasToDefaultHandler {
	return PromoteClubSlugAliasToDefaultHandler{cr: cr, ci: ci}
}

func (h PromoteClubSlugAliasToDefaultHandler) Handle(ctx context.Context, cmd PromoteClubSlugAliasToDefault) (*club.Club, error) {

	clb, err := h.cr.UpdateClubSlug(ctx, cmd.Principal, cmd.ClubId, func(club *club.Club) error {
		return club.MakeSlugAliasDefault(cmd.Principal, cmd.Slug)
	})

	if err != nil {
		return nil, err
	}

	if err := h.ci.IndexClub(ctx, clb); err != nil {
		return nil, err
	}

	return clb, nil
}
