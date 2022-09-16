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
	pr     post.Repository
	loader LoaderService
}

func NewRemovePostContentHandler(pr post.Repository, loader LoaderService) RemovePostContentHandler {
	return RemovePostContentHandler{pr: pr, loader: loader}
}

func (h RemovePostContentHandler) Handle(ctx context.Context, cmd RemovePostContent) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostContent(ctx, cmd.Principal, cmd.PostId, func(target *post.Post) error {

		removed, err := target.RemoveContentRequest(cmd.Principal, cmd.ContentIds)

		if err != nil {
			return err
		}

		// cancel processing for this media, if needed
		if err := h.loader.CancelMediaProcessing(ctx, removed); err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	return pendingPost, nil
}
