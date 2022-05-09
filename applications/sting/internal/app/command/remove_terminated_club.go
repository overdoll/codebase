package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type RemoveTerminatedClub struct {
	ClubId string
}

type RemoveTerminatedClubHandler struct {
	pr post.Repository
}

func NewRemoveTerminatedClubHandler(pr post.Repository) RemoveTerminatedClubHandler {
	return RemoveTerminatedClubHandler{pr: pr}
}

func (h RemoveTerminatedClubHandler) Handle(ctx context.Context, cmd RemoveTerminatedClub) error {
	return h.pr.RemoveTerminatedClub(ctx, cmd.ClubId)
}
