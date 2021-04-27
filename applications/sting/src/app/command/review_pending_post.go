package command

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/post"
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

	// Update pending post with new values
	pendingPost, err := h.pr.UpdatePendingPost(ctx, cmd.Id, func(pending *post.PostPending) (*post.PostPending, error) {

		// Need to grab this since our protobuf only contains references to IDs
		characters, err := h.pr.GetCharactersById(ctx, cmd.CharacterIds)

		if err != nil {
			return nil, err
		}

		err = pending.UpdateCharacters(characters)

		if err != nil {
			return nil, err
		}

		categories, err := h.pr.GetCategoriesById(ctx, cmd.CategoryIds)

		if err != nil {
			return nil, err
		}

		err = pending.UpdateCategories(categories)

		if err != nil {
			return nil, err
		}

		// need to grab artist, to ensure it's valid
		artist, err := h.pr.GetArtistById(ctx, cmd.ArtistId)

		if err != nil {
			return nil, err
		}

		pending.UpdateArtist(artist)

		// Update resource requests
		pending.RequestResources(cmd.CharacterRequests, cmd.CategoryRequests, cmd.MediaRequests)

		// mark the state of the post to be publishing
		pending.MakePublishing()

		return pending, nil
	})

	if err != nil {
		return err
	}

	// New event for post created, in order to index it
	if err := h.pe.PostCompleted(ctx, pendingPost); err != nil {
		return err
	}

	return nil
}
