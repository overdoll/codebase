package command

import (
	"context"

	"github.com/pkg/errors"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type SubmitPost struct {
	Principal *principal.Principal
	PostId    string
}

type SubmitPostHandler struct {
	pr     post.Repository
	pi     post.IndexRepository
	parley ParleyService
	loader LoaderService
}

func NewSubmitPostHandler(pr post.Repository, pi post.IndexRepository, parley ParleyService, loader LoaderService) SubmitPostHandler {
	return SubmitPostHandler{pr: pr, pi: pi, parley: parley, loader: loader}
}

func (h SubmitPostHandler) Handle(ctx context.Context, cmd SubmitPost) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePost(ctx, cmd.PostId, func(post *post.Post) error {

		allProcessed, err := h.loader.AllResourcesProcessed(ctx, post.ID(), post.AllContentResourceIds())

		if err != nil {
			return errors.Wrap(err, "failed to get resource process status")
		}

		moderatorId, err := h.parley.GetNextModeratorId(ctx)

		if err != nil {
			return errors.Wrap(err, "failed to get next moderator")
		}

		return post.SubmitPostRequest(cmd.Principal, moderatorId, allProcessed)
	})

	if err != nil {
		return nil, err
	}

	return pendingPost, nil
}
