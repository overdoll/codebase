package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type AddClubSlugAlias struct {
	Principal *principal.Principal

	ClubId string
	Slug   string
}

type AddClubSlugAliasHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewAddClubSlugAliasHandler(pr post.Repository, pi post.IndexRepository) AddClubSlugAliasHandler {
	return AddClubSlugAliasHandler{pr: pr, pi: pi}
}

func (h AddClubSlugAliasHandler) Handle(ctx context.Context, cmd AddClubSlugAlias) (*post.Club, error) {

	club, err := h.pr.UpdateClubSlugAliases(ctx, cmd.Principal, cmd.ClubId, func(club *post.Club) error {
		return club.AddSlugAlias(cmd.Principal, cmd.Slug)
	})

	if err != nil {
		return nil, err
	}

	if err := h.pi.IndexClub(ctx, club); err != nil {
		return nil, err
	}

	return club, nil
}
