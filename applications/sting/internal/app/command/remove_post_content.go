package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type RemovePostContent struct {
	Principal *principal.Principal

	PostId     string
	ContentIds []string
}

type RemovePostContentHandler struct {
	pr post.Repository
}

func NewRemovePostContentHandler(pr post.Repository) RemovePostContentHandler {
	return RemovePostContentHandler{pr: pr}
}

func (h RemovePostContentHandler) Handle(ctx context.Context, cmd RemovePostContent) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostContent(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {
		return post.RemoveContentRequest(cmd.Principal, cmd.ContentIds)
	})

	if err != nil {
		return nil, err
	}

	return pendingPost, nil
}
