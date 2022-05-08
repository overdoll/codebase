package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/event"
)

type NewSupporterPost struct {
	ClubId string
}

type NewSupporterPostHandler struct {
	event event.Repository
}

func NewNewSupporterPostHandler(event event.Repository) NewSupporterPostHandler {
	return NewSupporterPostHandler{event: event}
}

func (h NewSupporterPostHandler) Handle(ctx context.Context, cmd NewSupporterPost) error {
	return h.event.NewSupporterPost(ctx, cmd.ClubId)
}
