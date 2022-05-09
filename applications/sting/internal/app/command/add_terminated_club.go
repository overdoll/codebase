package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type AddTerminatedClub struct {
	ClubId string
}

type AddTerminatedClubHandler struct {
	pr post.Repository
}

func NewAddTerminatedClubHandler(pr post.Repository) AddTerminatedClubHandler {
	return AddTerminatedClubHandler{pr: pr}
}

func (h AddTerminatedClubHandler) Handle(ctx context.Context, cmd AddTerminatedClub) error {
	return h.pr.AddTerminatedClub(ctx, cmd.ClubId)
}
