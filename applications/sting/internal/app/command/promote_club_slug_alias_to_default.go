package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type PromoteClubSlugAliasToDefault struct {
	Principal *principal.Principal

	ClubId string
	Slug   string
}

type PromoteClubSlugAliasToDefaultHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewPromoteClubSlugAliasToDefaultHandler(pr post.Repository, pi post.IndexRepository) PromoteClubSlugAliasToDefaultHandler {
	return PromoteClubSlugAliasToDefaultHandler{pr: pr, pi: pi}
}

func (h PromoteClubSlugAliasToDefaultHandler) Handle(ctx context.Context, cmd PromoteClubSlugAliasToDefault) (*post.Club, error) {

	club, err := h.pr.UpdateClubSlug(ctx, cmd.Principal, cmd.ClubId, func(club *post.Club) error {
		return club.MakeSlugAliasDefault(cmd.Principal, cmd.Slug)
	})

	if err != nil {
		return nil, err
	}

	if err := h.pi.IndexClub(ctx, club); err != nil {
		return nil, err
	}

	return club, nil
}
