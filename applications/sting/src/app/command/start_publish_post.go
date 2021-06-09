package command

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

type StartPublishPostHandler struct {
	pi  post.IndexRepository
	pr  post.Repository
	pe  post.WorkflowRepository
	eva EvaService
}

func NewStartPublishPostHandler(pr post.Repository, pi post.IndexRepository, pe post.WorkflowRepository, eva EvaService) StartPublishPostHandler {
	return StartPublishPostHandler{pr: pr, pi: pi, pe: pe, eva: eva}
}

func (h StartPublishPostHandler) Handle(ctx context.Context, id string) error {

	pendingPost, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PostPending) error {

		// create a new user for this artist
		usr, err := h.eva.CreateUser(ctx, pending.Artist().Username(), "")

		if err != nil {
			return err
		}

		pending.MakePublishing()

		pending.UpdateArtist(post.NewArtist(usr.ID(), usr.Username()))

		return nil
	})

	if err != nil {
		return err
	}

	if err := h.pe.PublishPostWorkflow(ctx, pendingPost); err != nil {
		zap.S().Errorf("failed to create post event: %s", err)
		return err
	}

	return nil
}
