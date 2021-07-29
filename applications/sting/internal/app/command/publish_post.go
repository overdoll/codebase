package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/content"
	"overdoll/applications/sting/internal/domain/post"
)

type PublishPost struct {
	PostId string
}

type PublishPostHandler struct {
	pi  post.IndexRepository
	pr  post.Repository
	cr  content.Repository
	eva EvaService
}

func NewPublishPostHandler(pr post.Repository, pi post.IndexRepository, cr content.Repository, eva EvaService) PublishPostHandler {
	return PublishPostHandler{pr: pr, pi: pi, cr: cr, eva: eva}
}

func (h PublishPostHandler) Handle(ctx context.Context, cmd PublishPost) error {

	pendingPost, err := h.pr.UpdatePost(ctx, cmd.PostId, func(pending *post.Post) error {

		// Bulk index
		err := h.pi.IndexCategories(ctx, pending.Categories())

		if err != nil {
			return err
		}

		// Bulk index
		err = h.pi.IndexCharacters(ctx, pending.Characters())

		if err != nil {
			return err
		}

		// This will make sure the state of the post is always "review" before publishing - we may get an outdated record
		// from the review stage so it will retry at some point
		if err := pending.MakePublish(); err != nil {
			return err
		}

		// Update content - make the content public by moving it into the public bucket
		newContent, err := h.cr.MakeProcessedContentPublic(ctx, pending.ContributorId(), pending.Content())

		if err != nil {
			return err
		}

		pending.UpdateContent(newContent)

		return nil
	})

	if err != nil {
		return err
	}

	// delete pending post document since it's no longer needed
	return h.pi.DeletePost(ctx, pendingPost.ID())
}