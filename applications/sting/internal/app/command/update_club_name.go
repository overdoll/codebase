package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type UpdateClubName struct {
	Principal *principal.Principal

	ClubId string
	Name   string
}

type UpdateClubNameHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewUpdateClubNameHandler(pr post.Repository, pi post.IndexRepository) UpdateClubNameHandler {
	return UpdateClubNameHandler{pr: pr, pi: pi}
}

func (h UpdateClubNameHandler) Handle(ctx context.Context, cmd UpdateClubName) (*post.Club, error) {

	club, err := h.pr.UpdateClubName(ctx, cmd.Principal, cmd.ClubId, func(club *post.Club) error {
		return club.UpdateName(cmd.Principal, cmd.Name)
	})

	if err != nil {
		return nil, err
	}

	if err := h.pi.IndexClub(ctx, club); err != nil {
		return nil, err
	}

	return club, nil
}
