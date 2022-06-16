package command

import (
	"context"
	club2 "overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/principal"
)

type PromoteClubSlugAliasToDefault struct {
	Principal *principal.Principal

	ClubId string
	Slug   string
}

type PromoteClubSlugAliasToDefaultHandler struct {
	cr club2.Repository
}

func NewPromoteClubSlugAliasToDefaultHandler(cr club2.Repository) PromoteClubSlugAliasToDefaultHandler {
	return PromoteClubSlugAliasToDefaultHandler{cr: cr}
}

func (h PromoteClubSlugAliasToDefaultHandler) Handle(ctx context.Context, cmd PromoteClubSlugAliasToDefault) (*club2.Club, error) {

	clb, err := h.cr.UpdateClubSlug(ctx, cmd.ClubId, func(club *club2.Club) error {
		return club.MakeSlugAliasDefault(cmd.Principal, cmd.Slug)
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
