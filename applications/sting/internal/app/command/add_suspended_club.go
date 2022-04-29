package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type AddSuspendedClub struct {
	ClubId string
}

type AddSuspendedClubHandler struct {
	pr post.Repository
}

func NewAddSuspendedClubHandler(pr post.Repository) AddSuspendedClubHandler {
	return AddSuspendedClubHandler{pr: pr}
}

func (h AddSuspendedClubHandler) Handle(ctx context.Context, cmd AddSuspendedClub) error {
	return h.pr.AddSuspendedClub(ctx, cmd.ClubId)
}
