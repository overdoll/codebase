package event

import (
	"context"
	"fmt"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/category"
	"overdoll/applications/sting/src/domain/character"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/ksuid"
)

type PublishPostHandler struct {
	pr  post.Repository
	chr character.Repository
	ctr category.Repository

	ce category.EventRepository

	che character.EventRepository

	pe post.EventRepository
}

func NewPublishPostHandler(pr post.Repository, chr character.Repository, ctr category.Repository, ce category.EventRepository, pe post.EventRepository) PublishPostHandler {
	return PublishPostHandler{pr: pr, chr: chr, ctr: ctr, ce: ce, pe: pe}
}

func (h PublishPostHandler) HandlerName() string {
	return "PublishPostHandler"
}

func (h PublishPostHandler) NewEvent() interface{} {
	return &sting.PostCompleted{}
}

func (h PublishPostHandler) Handle(ctx context.Context, c interface{}) error {

	cmd := c.(*sting.PostCompleted)

	idParse, err := ksuid.Parse(cmd.Id)

	if err != nil {
		return fmt.Errorf("uuid not valid: %s", cmd.Id)
	}

	pendingPost, err := h.pr.GetPendingPost(ctx, idParse)

	if err != nil {
		return fmt.Errorf("could not get pending post: %s", err)
	}

	// This will make sure the state of the post is always "publishing" before publishing - we may get an outdated record
	// from the review stage so it will retry at some point
	err = pendingPost.MakePublish()

	if err != nil {
		return err
	}

	// Consume custom categories and run commands to create
	err = h.ce.CategoriesCreated(ctx, pendingPost.ConsumeCustomCategories())

	if err != nil {
		return err
	}

	// Consume custom characters, and run commands to create these custom characters
	chars, medias := pendingPost.ConsumeCustomCharacters()

	err = h.che.CharactersCreated(ctx, chars)

	if err != nil {
		return err
	}

	err = h.che.MediaCreated(ctx, medias)

	if err != nil {
		return err
	}

	err = h.pr.UpdatePendingPost(ctx, pendingPost)

	if err != nil {
		return fmt.Errorf("unable to update pending post: %s", err)
	}

	if err := h.pe.PostCreated(ctx, pendingPost); err != nil {
		return nil
	}

	return nil
}
