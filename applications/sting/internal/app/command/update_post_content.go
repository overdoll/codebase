package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type UpdatePostContent struct {
	Principal *principal.Principal

	PostId  string
	Content []string
}

type UpdatePostContentHandler struct {
	pr     post.Repository
	pi     post.IndexRepository
	loader LoaderService
}

func NewUpdatePostContentHandler(pr post.Repository, pi post.IndexRepository, loader LoaderService) UpdatePostContentHandler {
	return UpdatePostContentHandler{pr: pr, pi: pi, loader: loader}
}

func (h UpdatePostContentHandler) Handle(ctx context.Context, cmd UpdatePostContent) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostContent(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {

		// create resources from content
		resourceIds, err := h.loader.CreateOrGetResourcesFromUploads(ctx, cmd.PostId, cmd.Content)

		if err != nil {
			return err
		}

		return post.UpdateContentRequest(cmd.Principal, resourceIds)
	})

	if err != nil {
		return nil, err
	}

	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return nil, err
	}

	return pendingPost, nil
}
