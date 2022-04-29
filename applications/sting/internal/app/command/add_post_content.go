package command

import (
	"context"
	"github.com/pkg/errors"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type AddPostContent struct {
	Principal *principal.Principal

	PostId  string
	Content []string
}

type AddPostContentHandler struct {
	pr     post.Repository
	loader LoaderService
}

func NewAddPostContentHandler(pr post.Repository, loader LoaderService) AddPostContentHandler {
	return AddPostContentHandler{pr: pr, loader: loader}
}

func (h AddPostContentHandler) Handle(ctx context.Context, cmd AddPostContent) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostContent(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {

		// create resources from content
		resourceIds, err := h.loader.CreateOrGetResourcesFromUploads(ctx, cmd.PostId, cmd.Content, true)

		if err != nil {
			return errors.Wrap(err, "failed to create processed resources from uploads")
		}

		return post.AddContentRequest(cmd.Principal, resourceIds)
	})

	if err != nil {
		return nil, err
	}

	return pendingPost, nil
}
