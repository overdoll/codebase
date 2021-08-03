package command

import (
	"context"

	"github.com/pkg/errors"
	"overdoll/applications/sting/internal/domain/post"
)

type ReassignModerator struct {
	PostId string
}

type ReassignModeratorHandler struct {
	pi     post.IndexRepository
	pr     post.Repository
	parley ParleyService
}

func NewReassignModeratorHandler(pr post.Repository, pi post.IndexRepository, parley ParleyService) ReassignModeratorHandler {
	return ReassignModeratorHandler{pr: pr, pi: pi, parley: parley}
}

func (h ReassignModeratorHandler) Handle(ctx context.Context, cmd ReassignModerator) (bool, error) {

	pst, err := h.pr.UpdatePost(ctx, cmd.PostId, func(pendingPost *post.Post) error {

		newModId, err := h.parley.GetNextModeratorId(ctx)

		if err != nil {
			return errors.Wrap(err, "failed to get next moderator")
		}

		// if this returns an error, then we dont proceed with assigning a new moderator
		if err := pendingPost.UpdateModerator(newModId); err != nil {
			return post.ErrAlreadyModerated
		}

		return nil
	})

	if err != nil {
		if err == post.ErrAlreadyModerated {
			return false, nil
		}

		return false, err
	}

	// index pending post
	if err := h.pi.IndexPost(ctx, pst); err != nil {
		return false, err
	}

	return true, nil
}
