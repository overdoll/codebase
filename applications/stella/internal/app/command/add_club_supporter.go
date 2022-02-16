package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/event"
	"time"
)

type AddClubSupporter struct {
	AccountId   string
	ClubId      string
	SupportedAt time.Time
}

type AddClubSupporterHandler struct {
	event event.Repository
}

func NewAddClubSupporterHandler(event event.Repository) AddClubSupporterHandler {
	return AddClubSupporterHandler{event: event}
}

func (h AddClubSupporterHandler) Handle(ctx context.Context, cmd AddClubSupporter) error {
	return h.event.AddClubSupporter(ctx, cmd.ClubId, cmd.AccountId, cmd.SupportedAt)
}
