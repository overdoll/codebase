package event

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/post"
)

type PublishPostHandler struct {
	pi post.IndexRepository
	pe post.EventRepository
	pr post.Repository
}

func NewPublishPostHandler(pr post.Repository, pi post.IndexRepository, pe post.EventRepository) PublishPostHandler {
	return PublishPostHandler{pr: pr, pi: pi, pe: pe}
}

func (h PublishPostHandler) HandlerName() string {
	return "PublishPostHandler"
}

func (h PublishPostHandler) NewEvent() interface{} {
	return &sting.PostCompleted{}
}

func (h PublishPostHandler) Handle(ctx context.Context, c interface{}) error {

	cmd := c.(*sting.PostCompleted)

	pendingPost, err := h.pr.UpdatePendingPost(ctx, cmd.Id, func(pending *post.PostPending) (*post.PostPending, error) {

		// This will make sure the state of the post is always "publishing" before publishing - we may get an outdated record
		// from the review stage so it will retry at some point
		if err := pending.MakePublish(); err != nil {
			return nil, err
		}

		// Consume custom categories, characters, medias and run commands to create

		// TODO: improve this? - need a way to ensure custom resources are created at least once-
		categories, chars, medias := pending.ConsumeCustomResources()

		if err := h.pe.CategoriesCreated(ctx, categories); err != nil {
			return nil, err
		}

		if err := h.pe.CharactersCreated(ctx, chars); err != nil {
			return nil, err
		}

		if err := h.pe.MediaCreated(ctx, medias); err != nil {
			return nil, err
		}

		return pending, nil
	})

	if err != nil {
		return err
	}

	// Update pending post index
	if err := h.pe.PostPendingUpdated(ctx, pendingPost); err != nil {
		return nil
	}

	// Create a new post (publish pending it)
	if err := h.pe.PostCompleted(ctx, pendingPost); err != nil {
		return nil
	}

	return nil
}
