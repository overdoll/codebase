package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/domain/resource"
	"overdoll/libraries/principal"
)

type UpdatePostContent struct {
	Principal *principal.Principal

	PostId  string
	Content []string
}

type UpdatePostContentHandler struct {
	pr post.Repository
	pi post.IndexRepository
	cr resource.Repository
}

func NewUpdatePostContentHandler(pr post.Repository, pi post.IndexRepository) UpdatePostContentHandler {
	return UpdatePostContentHandler{pr: pr, pi: pi}
}

func (h UpdatePostContentHandler) Handle(ctx context.Context, cmd UpdatePostContent) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostContent(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {

		// create resources from content
		resources, err := h.cr.CreateResources(ctx, cmd.Content)

		if err != nil {
			return err
		}

		return post.UpdateContentRequest(cmd.Principal, resources)
	})

	if err != nil {
		return nil, err
	}

	// index the post
	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return nil, err
	}

	return pendingPost, nil
}
