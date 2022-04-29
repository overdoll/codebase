package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type RemoveSuspendedClub struct {
	ClubId string
}

type RemoveSuspendedClubHandler struct {
	pr post.Repository
}

func NewRemoveSuspendedClubHandler(pr post.Repository) RemoveSuspendedClubHandler {
	return RemoveSuspendedClubHandler{pr: pr}
}

func (h RemoveSuspendedClubHandler) Handle(ctx context.Context, cmd RemoveSuspendedClub) error {
	return h.pr.RemoveSuspendedClub(ctx, cmd.ClubId)
}
