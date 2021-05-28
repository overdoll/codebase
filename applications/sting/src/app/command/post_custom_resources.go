package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type PostCustomResourcesActivityHandler struct {
	pi post.IndexRepository
	pr post.Repository
}

func NewPostCustomResourcesActivityHandler(pr post.Repository, pi post.IndexRepository) PostCustomResourcesActivityHandler {
	return PostCustomResourcesActivityHandler{pr: pr, pi: pi}
}

func (h PostCustomResourcesActivityHandler) Handle(ctx context.Context, id string, ids []string) error {

	_, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PostPending) (*post.PostPending, error) {

		// Consume custom categories, characters, medias
		existingMedias, err := h.pr.GetMediasById(ctx, pending.GetExistingMediaIds())

		if err != nil {
			return nil, err
		}

		categories, characters, medias := pending.ConsumeCustomResources(existingMedias)

		// Create categories (from database)
		err = h.pr.CreateCategories(ctx, categories)

		if err != nil {
			return nil, err
		}

		err = h.pr.CreateCharacters(ctx, characters)

		if err != nil {
			return nil, err
		}

		// Create Media (from database)
		err = h.pr.CreateMedias(ctx, medias)

		if err != nil {
			return nil, err
		}

		return pending, nil
	})

	if err != nil {
		return err
	}

	return nil
}
