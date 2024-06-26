package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/media"
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

		// should only be able to add content to DRAFT posts
		if err := post.CanAddContent(cmd.Principal); err != nil {
			return err
		}

		// create resources from content
		resourceIds, err := h.loader.ProcessMediaFromUploads(ctx, cmd.Content, media.NewPostContentMediaLink(cmd.PostId))

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
