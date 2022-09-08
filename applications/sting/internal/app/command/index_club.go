package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
)

type IndexClub struct {
	ClubId string
}

type IndexClubHandler struct {
	cr club.Repository
}

func NewIndexClubHandler(cr club.Repository) IndexClubHandler {
	return IndexClubHandler{cr: cr}
}

func (h IndexClubHandler) Handle(ctx context.Context, cmd IndexClub) error {
	return h.cr.IndexClub(ctx, cmd.ClubId)
}
