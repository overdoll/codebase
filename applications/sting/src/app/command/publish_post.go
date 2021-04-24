package command

import (
	"context"
	"fmt"

	"github.com/ThreeDotsLabs/watermill/components/cqrs"
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

	commandBus *cqrs.CommandBus
}

func NewPublishPostHandler(pr post.Repository, chr character.Repository, ctr category.Repository, commandBus *cqrs.CommandBus) PublishPostHandler {
	return PublishPostHandler{pr: pr, chr: chr, ctr: ctr, commandBus: commandBus}
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

	cats := pendingPost.ConsumeCustomCategories()

	err = h.ctr.CreateCategories(ctx, cats)

	if err != nil {
		return fmt.Errorf("could not create categories: %s", err)
	}

	chars, medias := pendingPost.ConsumeCustomCharacters()

	err = h.chr.CreateCharacters(ctx, chars)

	if err != nil {
		return fmt.Errorf("could not create characters: %s", err)
	}

	err = h.chr.CreateMedias(ctx, medias)

	if err != nil {
		return fmt.Errorf("could not create medias: %s", err)
	}

	// publish post
	err = pendingPost.Publish()

	if err != nil {
		return err
	}

	err = h.pr.UpdatePendingPost(ctx, pendingPost)

	if err != nil {
		return fmt.Errorf("unable to update pending post: %s", err)
	}

	return nil
}
