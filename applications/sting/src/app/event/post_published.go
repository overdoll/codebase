package event

import (
	"context"
	"fmt"

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

	pendingPost, err := h.pr.GetPendingPost(ctx, cmd.Id)

	if err != nil {
		return fmt.Errorf("could not get pending post: %s", err)
	}

	// This will make sure the state of the post is always "publishing" before publishing - we may get an outdated record
	// from the review stage so it will retry at some point
	if err := pendingPost.MakePublish(); err != nil {
		return err
	}

	// Consume custom categories and run commands to create
	if err := h.pe.CategoriesCreated(ctx, pendingPost.ConsumeCustomCategories()); err != nil {
		return err
	}

	// Consume custom characters, and run commands to create these custom characters
	chars, medias := pendingPost.ConsumeCustomCharacters()

	if err := h.pe.CharactersCreated(ctx, chars); err != nil {
		return err
	}

	if err := h.pe.MediaCreated(ctx, medias); err != nil {
		return err
	}

	if err := h.pr.UpdatePendingPost(ctx, pendingPost); err != nil {
		return fmt.Errorf("unable to update pending post: %s", err)
	}

	if err := h.pe.PostCreated(ctx, pendingPost); err != nil {
		return nil
	}

	return nil
}
