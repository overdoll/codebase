package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/event"
	"overdoll/applications/parley/internal/domain/moderator"
)

type PutPostIntoModeratorQueueOrPublish struct {
	PostId string
}

type PutPostIntoModeratorQueueOrPublishHandler struct {
	mr    moderator.Repository
	event event.Repository
	sting StingService
}

func NewPutPostIntoModeratorQueueOrPublishHandler(mr moderator.Repository, event event.Repository, sting StingService) PutPostIntoModeratorQueueOrPublishHandler {
	return PutPostIntoModeratorQueueOrPublishHandler{mr: mr, event: event, sting: sting}
}

func (h PutPostIntoModeratorQueueOrPublishHandler) Handle(ctx context.Context, cmd PutPostIntoModeratorQueueOrPublish) (bool, error) {

	_, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return false, err
	}

	if err := h.event.PutPostIntoModeratorQueue(ctx, cmd.PostId); err != nil {
		return false, err
	}

	return true, nil
}
