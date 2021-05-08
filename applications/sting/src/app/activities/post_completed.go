package activities

import (
	"context"

	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/domain/content"
	"overdoll/applications/sting/src/domain/post"
)

type PublishPostActivityHandler struct {
	pi  post.IndexRepository
	pr  post.Repository
	cr  content.Repository
	eva app.EvaService
}

func NewPublishPostActivityHandler(pr post.Repository, pi post.IndexRepository, cr content.Repository, eva app.EvaService) PublishPostActivityHandler {
	return PublishPostActivityHandler{pr: pr, pi: pi, cr: cr, eva: eva}
}

func (h PublishPostActivityHandler) Handle(ctx context.Context, id string) error {

	pendingPost, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PostPending) (*post.PostPending, error) {

		// Bulk index
		err := h.pi.BulkIndexCategories(ctx, pending.Categories())

		if err != nil {
			return nil, err
		}

		// Bulk index
		err = h.pi.BulkIndexCharacters(ctx, pending.Characters())

		if err != nil {
			return nil, err
		}

		// Get our contributor
		usr, err := h.eva.GetUser(ctx, pending.Contributor().ID())

		if err != nil {
			return nil, err
		}

		// Update contributor, since our database doesn't contain the reference
		pending.UpdateContributor(usr)

		// This will make sure the state of the post is always "publishing" before publishing - we may get an outdated record
		// from the review stage so it will retry at some point
		if err := pending.MakePublish(); err != nil {
			return nil, err
		}

		// Update content - make the content public by moving it into the public bucket
		newContent, err := h.cr.MakeProcessedContentPublic(ctx, pending.Contributor().ID(), pending.RawContent())

		if err != nil {
			return nil, err
		}

		pending.UpdateContent(newContent)

		return pending, nil
	})

	if err != nil {
		return err
	}

	// Update pending post index
	if err := h.pi.IndexPendingPost(ctx, pendingPost); err != nil {
		return err
	}

	return nil
}
