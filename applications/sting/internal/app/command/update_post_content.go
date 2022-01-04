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

func NewUpdatePostContentHandler(pr post.Repository, pi post.IndexRepository, cr resource.Repository) UpdatePostContentHandler {
	return UpdatePostContentHandler{pr: pr, pi: pi, cr: cr}
}

func (h UpdatePostContentHandler) Handle(ctx context.Context, cmd UpdatePostContent) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostContent(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {

		// create resources from content
		resources, err := h.cr.CreateOrGetResourcesFromUploads(ctx, cmd.PostId, cmd.Content)

		if err != nil {
			return err
		}

		var resourceIds []string

		for _, i := range resources {
			resourceIds = append(resourceIds, i.ID())
		}

		return post.UpdateContentRequest(cmd.Principal, resourceIds)
	})

	if err != nil {
		return nil, err
	}

	return pendingPost, nil
}
