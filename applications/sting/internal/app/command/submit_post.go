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
}

func NewSubmitPostHandler(pr post.Repository, pi post.IndexRepository, parley ParleyService) SubmitPostHandler {
	return SubmitPostHandler{pr: pr, pi: pi, parley: parley}
}

func (h SubmitPostHandler) Handle(ctx context.Context, cmd SubmitPost) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePost(ctx, cmd.PostId, func(post *post.Post) error {

		moderatorId, err := h.parley.GetNextModeratorId(ctx)

		if err != nil {
			return errors.Wrap(err, "failed to get next moderator")
		}

		return post.SubmitPost(cmd.Principal, moderatorId)
	})

	if err != nil {
		return nil, err
	}

	return pendingPost, nil
}
