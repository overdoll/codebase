package command

import (
	"context"
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
	pi     post.IndexRepository
	loader LoaderService
}

func NewAddPostContentHandler(pr post.Repository, pi post.IndexRepository, loader LoaderService) AddPostContentHandler {
	return AddPostContentHandler{pr: pr, pi: pi, loader: loader}
}

func (h AddPostContentHandler) Handle(ctx context.Context, cmd AddPostContent) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostContent(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {

		// create resources from content
		resourceIds, err := h.loader.CreateOrGetResourcesFromUploads(ctx, cmd.PostId, cmd.Content)

		if err != nil {
			return err
		}

		return post.AddContentRequest(cmd.Principal, resourceIds)
	})

	if err != nil {
		return nil, err
	}

	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return nil, err
	}

	return pendingPost, nil
}
