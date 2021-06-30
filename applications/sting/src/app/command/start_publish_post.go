package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type StartPublishPostHandler struct {
	pi  post.IndexRepository
	pr  post.Repository
	eva EvaService
}

func NewStartPublishPostHandler(pr post.Repository, pi post.IndexRepository, eva EvaService) StartPublishPostHandler {
	return StartPublishPostHandler{pr: pr, pi: pi, eva: eva}
}

func (h StartPublishPostHandler) Handle(ctx context.Context, id string) error {

	pendingPost, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PendingPost) error {

		// if no artist assigned, create it
		if pending.ArtistId() == "" {
			// create a new user for this artist
			usr, err := h.eva.CreateAccount(ctx, pending.ArtistUsername(), "")

			if err != nil {
				return err
			}

			// add to artist record
			if err := h.pr.CreateArtist(ctx, post.NewArtist(usr.ID())); err != nil {
				return err
			}

			pending.UpdateArtistId(usr.ID())
		}

		pending.MakePublishing()

		return nil
	})

	if err != nil {
		return nil
	}

	return h.pi.IndexPendingPost(ctx, pendingPost)
}
