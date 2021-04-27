package command

import (
	"context"
	"fmt"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/domain/content"
	"overdoll/applications/sting/src/domain/post"
)

type NewPostHandler struct {
	pr  post.Repository
	cr  content.Repository
	eva app.EvaService

	pe post.EventRepository
}

func NewNewPostHandler(pr post.Repository, cr content.Repository, eva app.EvaService, pe post.EventRepository) NewPostHandler {
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

	// Grab categories & characters, because protobuf only contains ID references
	characters, err := h.pr.GetCharactersById(ctx, cmd.Characters)

	if err != nil {
		return err
	}

	categories, err := h.pr.GetCategoriesById(ctx, cmd.Categories)

	if err != nil {
		return err
	}

	artist := post.NewArtist(cmd.ArtistId, cmd.ArtistUsername)

	// Artist ID is not null, they are not requesting an artist
	if cmd.ArtistId != "" {
		artist, err = h.pr.GetArtistById(ctx, cmd.ArtistId)

		if err != nil {
			return err
		}
	}

	// Get our contributor
	usr, err := h.eva.GetUser(ctx, cmd.ContributorId)

	if err != nil {
		return fmt.Errorf("could not get user: %s", err)
	}

	pendingPost, err := post.NewPendingPost(artist, usr, cmd.Content, characters, categories)

	if err != nil {
		return fmt.Errorf("could not create pending post: %s", err)
	}

	// Request new resources
	pendingPost.RequestResources(cmd.CharacterRequests, cmd.CategoriesRequests, cmd.MediaRequests)

	_ = pendingPost.MakePublicOrReview()

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
