package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type AddPostContent struct {
	Principal *principal.Principal

	PostId  string
	Content []string
}

type AddPostContentHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewAddPostContentHandler(pr post.Repository, event event.Repository) AddPostContentHandler {
	return AddPostContentHandler{pr: pr, event: event}
}

func (h AddPostContentHandler) Handle(ctx context.Context, cmd AddPostContent) (*post.Post, error) {

	var resourceIds []*post.Resource

	pendingPost, err := h.pr.UpdatePostContent(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {
		var err error

		// create resources from content
		resourceIds, err = h.pr.GetAndCreateResourcesForPost(ctx, post, cmd.Content, true)

		if err != nil {
			return err
		}

		return post.AddContentRequest(cmd.Principal, resourceIds)
	})

	if err != nil {
		return nil, err
	}

	if err := h.event.ProcessResourcesForPost(ctx, pendingPost, resourceIds); err != nil {
		return nil, err
	}

	return pendingPost, nil
}
