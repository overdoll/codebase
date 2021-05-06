package workflow

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
	pi  post.IndexRepository
	cr  content.Repository
	eva app.EvaService

	pe post.EventRepository
}

func NewNewPostHandler(pr post.Repository, pi post.IndexRepository, cr content.Repository, eva app.EvaService, pe post.EventRepository) NewPostHandler {
	return NewPostHandler{pr: pr, cr: cr, eva: eva, pe: pe, pi: pi}
}

func (h NewPostHandler) HandlerName() string {
	return "NewPostHandler"
}

func (h NewPostHandler) NewCommand() interface{} {
	return &sting.SchedulePost{}
}

func (h NewPostHandler) Handle(ctx context.Context, c interface{}) error {

	pendingPost, err := h.pr.GetPendingPost(ctx, "id")

	if err != nil {
		return fmt.Errorf("could not get pending post: %s", err)
	}

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

	// Update pending post index
	if err := h.pi.IndexPendingPost(ctx, pendingPost); err != nil {
		return err
	}

	// If not in review ("publishing"), then we dispatch a job to publish the post
	if !pendingPost.InReview() {
		if err := h.pe.PostCompleted(ctx, pendingPost); err != nil {
			return err
		}
	}

	return nil
}
