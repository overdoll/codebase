package command

import (
	"context"
	"fmt"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/category"
	"overdoll/applications/sting/src/domain/character"
	"overdoll/applications/sting/src/domain/content"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/ksuid"
)

type NewPostHandler struct {
	pr  post.Repository
	cr content.Repository
	eva EvaService

	pe post.EventRepository
}

func NewNewPostHandler(pr post.Repository, cr content.Repository, eva EvaService, pe post.EventRepository) NewPostHandler {
	return NewPostHandler{pr: pr, cr: cr, eva: eva, pe: pe}
}

func (h NewPostHandler) HandlerName() string {
	return "NewPostHandler"
}

func (h NewPostHandler) NewCommand() interface{} {
	return &sting.SchedulePost{}
}

func (h NewPostHandler) Handle(ctx context.Context, c interface{}) error {

	cmd := c.(*sting.SchedulePost).Post

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

	// TODO: restructure so that this check is only done when the post is being created (createPendingPost func - will also check the DB to make sure categories + characters exist)
	err = pr.CheckIfCharactersAndCategoriesExist(ctx, pendingPost)

	if err != nil {
		return err
	}

	// Request new resources
	pendingPost.RequestResources(cmd.CharacterRequests, cmd.CategoriesRequests, cmd.MediaRequests)

	usr, err := h.eva.GetUser(ctx, contributorParse)

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
	if err := h.pr.CreatePendingPost(ctx, pendingPost); err != nil {
		return err
	}

	// If not in review ("publishing"), then we dispatch a job to publish the post
	if !pendingPost.InReview() {
		if err := h.pe.PostCreated(ctx, pendingPost); err != nil {
			return err
		}
	} else {
		// dispatch a task to update our post, if it's not in review (so moderators can see it)
		if err := h.pe.PostPendingUpdated(ctx, pendingPost); err != nil {
			return err
		}
	}

	return nil
}
