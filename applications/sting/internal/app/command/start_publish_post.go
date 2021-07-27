package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type StartPublishPost struct {
	PostId string
}

type StartPublishPostHandler struct {
	pi  post.IndexRepository
	pr  post.Repository
	eva EvaService
}

func NewStartPublishPostHandler(pr post.Repository, pi post.IndexRepository, eva EvaService) StartPublishPostHandler {
	return StartPublishPostHandler{pr: pr, pi: pi, eva: eva}
}

func (h StartPublishPostHandler) Handle(ctx context.Context, cmd StartPublishPost) error {

	pendingPost, err := h.pr.UpdatePost(ctx, cmd.PostId, func(pending *post.Post) error {

		// if no artist assigned, create it
		if pending.IsCustomArtist() {
			// create a new account for this artist
			usr, err := h.eva.CreateAccount(ctx, pending.CustomArtistUsername(), "")

			if err != nil {
				return err
			}

			// add to artist record
			if err := h.pr.CreateArtist(ctx, post.NewArtist(usr.ID())); err != nil {
				return err
			}

			pending.UpdateArtist(usr.ID())
		}

		pending.MakePublishing()

		return nil
	})

	if err != nil {
		return nil
	}

	return h.pi.IndexPost(ctx, pendingPost)
}
