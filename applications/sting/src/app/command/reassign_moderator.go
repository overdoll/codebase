package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type ReassignModeratorHandler struct {
	pi     post.IndexRepository
	pr     post.Repository
	parley ParleyService
}

func NewReassignModeratorHandler(pr post.Repository, pi post.IndexRepository, parley ParleyService) ReassignModeratorHandler {
	return ReassignModeratorHandler{pr: pr, pi: pi, parley: parley}
}

func (h ReassignModeratorHandler) Handle(ctx context.Context, oldId, newId string) (bool, error) {

	oldPost, err := h.pr.GetPendingPost(ctx, oldId)

	if err != nil {
		return false, err
	}

	newModId, err := h.parley.GetNextModeratorId(ctx)

	if err != nil {
		return false, err
	}

	// if this returns an error, then we dont proceed with assigning a new moderator
	if err := oldPost.UpdateModerator(newId, newModId); err != nil {
		return true, nil
	}

	// create a new pending post
	if err := h.pr.CreatePendingPost(ctx, oldPost); err != nil {
		return false, err
	}

	// index pending post
	if err := h.pi.IndexPendingPost(ctx, oldPost); err != nil {
		return false, err
	}

	// delete old post from ES index
	if err := h.pi.DeletePendingPostDocument(ctx, oldId); err != nil {
		return false, err
	}

	// delete old post
	if err := h.pr.DeletePendingPost(ctx, oldId); err != nil {
		return false, err
	}

	return true, nil
}
