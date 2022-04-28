package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"

	"overdoll/libraries/principal"
)

type RemoveClubSlugAlias struct {
	Principal *principal.Principal

	ClubId string
	Slug   string
}

type RemoveClubSlugAliasHandler struct {
	cr club.Repository
}

func NewRemoveClubSlugAliasHandler(cr club.Repository) RemoveClubSlugAliasHandler {
	return RemoveClubSlugAliasHandler{cr: cr}
}

func (h RemoveClubSlugAliasHandler) Handle(ctx context.Context, cmd RemoveClubSlugAlias) (*club.Club, error) {

	clb, err := h.cr.UpdateClubSlugAliases(ctx, cmd.ClubId, func(club *club.Club) error {
		return club.RemoveSlugAlias(cmd.Principal, cmd.Slug)
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
