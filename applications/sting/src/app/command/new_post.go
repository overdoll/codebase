package command

import (
	"context"
	"fmt"

	"github.com/ThreeDotsLabs/watermill/components/cqrs"
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/category"
	"overdoll/applications/sting/src/domain/character"
	"overdoll/applications/sting/src/domain/content"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/ksuid"
)

type NewPostHandler struct {
	pr  post.Repository
	chr character.Repository
	ctr category.Repository

	cr content.Repository

	eva EvaService

	eventBus *cqrs.EventBus
}

func NewNewPostHandler(pr post.Repository, chr character.Repository, ctr category.Repository, cr content.Repository, eva EvaService, eventBus *cqrs.EventBus) NewPostHandler {
	return NewPostHandler{pr: pr, chr: chr, ctr: ctr, cr: cr, eva: eva, eventBus: eventBus}
}

func (h NewPostHandler) HandlerName() string {
	return "NewPostHandler"
}

func (h NewPostHandler) NewCommand() interface{} {
	return &sting.SchedulePost{}
}

func (h NewPostHandler) Handle(ctx context.Context, c interface{}) error {

	cmd := c.(*sting.SchedulePost)

	characterUuids, err := ksuid.ToUUIDArray(cmd.Characters)

	if err != nil {
		return fmt.Errorf("uuids not valid: %s", cmd.Characters)
	}

	categoryUuids, err := ksuid.ToUUIDArray(cmd.Categories)

	if err != nil {
		return fmt.Errorf("uuids not valid: %s", cmd.Categories)
	}

	contributorParse, err := ksuid.Parse(cmd.ContributorId)

	if err != nil {
		return fmt.Errorf("uuid not valid: %s", cmd.ContributorId)
	}

	pendingPost, err := post.NewPendingPost(ksuid.New(), cmd.ArtistId, cmd.ArtistUsername, contributorParse, cmd.Content, characterUuids, categoryUuids)

	if err != nil {
		return fmt.Errorf("could not create pending post: %s", err)
	}

	err = pendingPost.ValidateCharactersAndCategories(ctx, h.chr, h.ctr)

	if err != nil {
		return err
	}

	// Request new resources
	pendingPost.RequestResources(cmd.CharacterRequests, cmd.CategoriesRequests, cmd.MediaRequests)

	usr, err := h.eva.GetUser(ctx, cmd.ContributorId)

	if err != nil {
		return fmt.Errorf("could not get user: %s", err)
	}

	_ = pendingPost.MakePublicOrReview(usr)

	// Process content (mime-type checks, etc...)
	cnt, err := h.cr.ProcessContent(ctx, cmd.ContributorId, cmd.Content)

	if err != nil {
		return fmt.Errorf("unable to process content: %s", err)
	}

	// update content
	pendingPost.UpdateContent(cnt)

	// create a pending post in the database with all of the data
	err = h.pr.CreatePendingPost(ctx, pendingPost)

	if err != nil {
		return err
	}

	// If not in review ("publishing"), then we dispatch a job to publish the post
	if !pendingPost.InReview() {
		// TODO: dispatch a job if review not required to publish the post
	}

	return nil
}
