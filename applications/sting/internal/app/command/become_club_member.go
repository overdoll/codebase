package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type BecomeClubMember struct {
	Principal *principal.Principal

	ClubId string
}

type BecomeClubMemberHandler struct {
	pr post.Repository
}

func NewBecomeClubMemberHandler(pr post.Repository) BecomeClubMemberHandler {
	return BecomeClubMemberHandler{pr: pr}
}

func (h BecomeClubMemberHandler) Handle(ctx context.Context, cmd AddClubSlugAlias) (*club.Club, error) {

	club, err := h.pr.UpdateClubSlugAliases(ctx, cmd.Principal, cmd.ClubId, func(club *club.Club) error {
		return club.AddSlugAlias(cmd.Principal, cmd.Slug)
	})

	if err != nil {
		return nil, err
	}

	return club, nil
}
