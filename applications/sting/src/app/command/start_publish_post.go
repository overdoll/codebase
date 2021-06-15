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

	_, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PendingPost) error {

		// if no artist assigned, create it
		if pending.Artist().ID() == "" {
			// create a new user for this artist
			usr, err := h.eva.CreateUser(ctx, pending.Artist().Username(), "")

			if err != nil {
				return err
			}

			// add to artist record
			if err := h.pr.CreateArtist(ctx, post.NewArtist(usr.ID(), usr.Username())); err != nil {
				return err
			}

			pending.UpdateArtist(post.NewArtist(usr.ID(), usr.Username()))
		}

		pending.MakePublishing()

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}
