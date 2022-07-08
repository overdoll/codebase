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
	loader LoaderService
}

func NewAddPostContentHandler(pr post.Repository, loader LoaderService) AddPostContentHandler {
	return AddPostContentHandler{pr: pr, loader: loader}
}

func (h AddPostContentHandler) Handle(ctx context.Context, cmd AddPostContent) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostContent(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {

		// create resources from content
		resourceIds, err := h.loader.CreateOrGetResourcesFromUploads(ctx, cmd.PostId, cmd.Content, true, "POST", false, 720, 0)

		if err != nil {
			return err
		}

		return post.AddContentRequest(cmd.Principal, resourceIds)
	})

	if err != nil {
		return nil, err
	}

	return pendingPost, nil
}
