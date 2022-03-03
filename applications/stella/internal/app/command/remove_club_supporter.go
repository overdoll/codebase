package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/event"
)

type RemoveClubSupporter struct {
	AccountId string
	ClubId    string
}

type RemoveClubSupporterHandler struct {
	event event.Repository
}

func NewRemoveClubSupporterHandler(event event.Repository) RemoveClubSupporterHandler {
	return RemoveClubSupporterHandler{event: event}
}

func (h RemoveClubSupporterHandler) Handle(ctx context.Context, cmd RemoveClubSupporter) error {
	return h.event.RemoveClubSupporter(ctx, cmd.ClubId, cmd.AccountId)
}
