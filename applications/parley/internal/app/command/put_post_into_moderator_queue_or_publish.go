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
	eva   EvaService
}

func NewPutPostIntoModeratorQueueOrPublishHandler(mr moderator.Repository, event event.Repository, sting StingService, eva EvaService) PutPostIntoModeratorQueueOrPublishHandler {
	return PutPostIntoModeratorQueueOrPublishHandler{mr: mr, event: event, sting: sting, eva: eva}
}

func (h PutPostIntoModeratorQueueOrPublishHandler) Handle(ctx context.Context, cmd PutPostIntoModeratorQueueOrPublish) (bool, error) {

	pst, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return false, err
	}

	acc, err := h.eva.GetAccount(ctx, pst.AccountId())

	if err != nil {
		return false, err
	}

	if acc.IsStaff() || acc.IsWorker() {
		return false, nil
	}

	if err := h.event.PutPostIntoModeratorQueue(ctx, cmd.PostId); err != nil {
		return false, err
	}

	return true, nil
}
