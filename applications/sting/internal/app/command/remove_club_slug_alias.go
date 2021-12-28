package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type RemoveClubSlugAlias struct {
	Principal *principal.Principal

	ClubId string
	Slug   string
}

type RemoveClubSlugAliasHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewRemoveClubSlugAliasHandler(pr post.Repository, pi post.IndexRepository) RemoveClubSlugAliasHandler {
	return RemoveClubSlugAliasHandler{pr: pr, pi: pi}
}

func (h RemoveClubSlugAliasHandler) Handle(ctx context.Context, cmd RemoveClubSlugAlias) (*post.Club, error) {

	club, err := h.pr.UpdateClubSlugAliases(ctx, cmd.Principal, cmd.ClubId, func(club *post.Club) error {
		return club.RemoveSlugAlias(cmd.Principal, cmd.Slug)
	})

	if err != nil {
		return nil, err
	}

	if err := h.pi.IndexClub(ctx, club); err != nil {
		return nil, err
	}

	return club, nil
}
