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
}

func NewPromoteClubSlugAliasToDefaultHandler(cr club.Repository) PromoteClubSlugAliasToDefaultHandler {
	return PromoteClubSlugAliasToDefaultHandler{cr: cr}
}

func (h PromoteClubSlugAliasToDefaultHandler) Handle(ctx context.Context, cmd PromoteClubSlugAliasToDefault) (*club.Club, error) {

	clb, err := h.cr.UpdateClubSlug(ctx, cmd.ClubId, func(club *club.Club) error {
		return club.MakeSlugAliasDefault(cmd.Principal, cmd.Slug)
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
