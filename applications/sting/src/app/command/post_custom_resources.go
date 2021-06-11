package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type PostCustomResourcesHandler struct {
	pi post.IndexRepository
	pr post.Repository
}

func NewPostCustomResourcesHandler(pr post.Repository, pi post.IndexRepository) PostCustomResourcesHandler {
	return PostCustomResourcesHandler{pr: pr, pi: pi}
}

func (h PostCustomResourcesHandler) Handle(ctx context.Context, id string, ids []string) error {

	_, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PostPending) error {

		// put into "publishing"
		pending.MakePublishing()

		// Consume custom categories, characters, medias
		existingMedias, err := h.pr.GetMediasById(ctx, pending.GetExistingMediaIds())

		if err != nil {
			return err
		}

		categories, characters, medias := pending.ConsumeCustomResources(existingMedias)

		// Create categories (from database)
		if err := h.pr.CreateCategories(ctx, categories); err != nil {
			return err
		}

		if err := h.pr.CreateCharacters(ctx, characters); err != nil {
			return err
		}

		// Create Media (from database)
		if err := h.pr.CreateMedias(ctx, medias); err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}
