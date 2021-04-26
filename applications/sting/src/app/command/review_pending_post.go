package command

import (
	"context"
	"fmt"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/ksuid"
)

type ReviewPostHandler struct {
	pr post.Repository
	pe post.EventRepository
}

func NewReviewPostHandler(pr post.Repository, pe post.EventRepository) ReviewPostHandler {
	return ReviewPostHandler{pr: pr, pe: pe}
}

func (h ReviewPostHandler) HandlerName() string {
	return "ReviewPostHandler"
}

func (h ReviewPostHandler) NewCommand() interface{} {
	return &sting.ReviewPost{}
}

func (h ReviewPostHandler) Handle(ctx context.Context, c interface{}) error {
	cmd := c.(*sting.ReviewPost).Post

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

	pendingPost, err := post.NewPendingPost(idParse, cmd.ArtistId, cmd.ArtistUsername, oldPendingPost.Contributor(), oldPendingPost.Content(), characterUuids, categoryUuids, oldPendingPost.PostedAt())

	if err != nil {
		return fmt.Errorf("could not create pending post: %s", err)
	}

	// TODO: restructure so that this check is only done when the post is being created (createPendingPost func - will also check the DB to make sure categories + characters exist)
	err = pendingPost.ValidateCharactersAndCategories(ctx, h.chr, h.ctr)

	if err != nil {
		return err
	}

	// Request new resources - update it
	pendingPost.RequestResources(cmd.CharacterRequests, cmd.CategoriesRequests, cmd.MediaRequests)

	// make the state of the post to publishing
	pendingPost.MakePublishing()

	// Update pending post
	err = h.pr.UpdatePendingPost(ctx, pendingPost)

	if err != nil {
		return fmt.Errorf("could not update pending post: %s", err)
	}

	if err := h.pe.PostCreated(ctx, pendingPost); err != nil {
		return err
	}

	return nil
}
