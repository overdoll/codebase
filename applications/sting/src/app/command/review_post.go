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

type ReviewPostHandler struct {
	pr post.Repository

	chr character.Repository
	ctr category.Repository

	eventBus *cqrs.EventBus
}

func NewReviewPostHandler(pr post.Repository, chr character.Repository, ctr category.Repository, eventBus *cqrs.EventBus) ReviewPostHandler {
	return ReviewPostHandler{pr: pr, chr: chr, ctr: ctr, eventBus: eventBus}
}

func (h ReviewPostHandler) HandlerName() string {
	return "ReviewPostHandler"
}

func (h ReviewPostHandler) NewCommand() interface{} {
	return &sting.ReviewPost{}
}

func (h ReviewPostHandler) Handle(ctx context.Context, c interface{}) error {
	cmd := c.(*sting.ReviewPost)

	characterUuids, err := ksuid.ToUUIDArray(cmd.Characters)

	if err != nil {
		return fmt.Errorf("uuids not valid: %s", cmd.Characters)
	}

	categoryUuids, err := ksuid.ToUUIDArray(cmd.Categories)

	if err != nil {
		return fmt.Errorf("uuids not valid: %s", cmd.Categories)
	}

	idParse, err := ksuid.Parse(cmd.Id)

	if err != nil {
		return fmt.Errorf("uuid not valid: %s", cmd.Id)
	}

	oldPendingPost, err := h.pr.GetPendingPost(ctx, idParse)

	if err != nil {
		return fmt.Errorf("error grabbing pending post %s", err)
	}

	pendingPost, err := post.NewPendingPost(idParse, cmd.ArtistId, cmd.ArtistUsername, oldPendingPost.ContributorId(), oldPendingPost.Content(), characterUuids, categoryUuids)

	if err != nil {
		return fmt.Errorf("could not create pending post: %s", err)
	}

	err = pendingPost.ValidateCharactersAndCategories(ctx, h.chr, h.ctr)

	if err != nil {
		return err
	}

	// Request new resources - update it
	pendingPost.RequestResources(cmd.CharacterRequests, cmd.CategoriesRequests, cmd.MediaRequests)

	// Update pending post
	err = h.pr.UpdatePendingPost(ctx, pendingPost)

	if err != nil {
		return fmt.Errorf("could not update pending post: %s", err)
	}

	if err := h.eventBus.Publish(ctx, &sting.PostCompleted{Id: pendingPost.ID().String()}); err != nil {
		return err
	}

	return nil
}
