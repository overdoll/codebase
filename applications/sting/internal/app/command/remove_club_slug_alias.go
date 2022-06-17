package command

import (
	"context"
	club2 "overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/principal"
)

type RemoveClubSlugAlias struct {
	Principal *principal.Principal

	ClubId string
	Slug   string
}

type RemoveClubSlugAliasHandler struct {
	cr club2.Repository
}

func NewRemoveClubSlugAliasHandler(cr club2.Repository) RemoveClubSlugAliasHandler {
	return RemoveClubSlugAliasHandler{cr: cr}
}

func (h RemoveClubSlugAliasHandler) Handle(ctx context.Context, cmd RemoveClubSlugAlias) (*club2.Club, error) {

	clb, err := h.cr.UpdateClubSlugAliases(ctx, cmd.ClubId, func(club *club2.Club) error {
		return club.RemoveSlugAlias(cmd.Principal, cmd.Slug)
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
