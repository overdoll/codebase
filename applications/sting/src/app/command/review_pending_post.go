package command

import (
	"context"
	"errors"

	"overdoll/applications/sting/src/domain/post"
)

var (
	ErrReviewFailed = errors.New("review failed")
)

type ReviewPostHandler struct {
	pr post.Repository
	pe post.EventRepository
}

func NewReviewPostHandler(pr post.Repository, pe post.EventRepository) ReviewPostHandler {
	return ReviewPostHandler{pr: pr, pe: pe}
}

func (h ReviewPostHandler) Handle(ctx context.Context, id, artistId string, characterIds, categoryIds []string, characterRequests map[string]string, mediaRequest, categoryRequests []string) (*post.PostPending, error) {

	// Update pending post with new values
	pendingPost, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PostPending) (*post.PostPending, error) {

		// Need to grab this since our protobuf only contains references to IDs
		characters, err := h.pr.GetCharactersById(ctx, characterIds)

		if err != nil {
			return nil, err
		}

		err = pending.UpdateCharacters(characters)

		if err != nil {
			return nil, err
		}

		categories, err := h.pr.GetCategoriesById(ctx, categoryIds)

		if err != nil {
			return nil, err
		}

		err = pending.UpdateCategories(categories)

		if err != nil {
			return nil, err
		}

		// need to grab artist, to ensure it's valid
		artist, err := h.pr.GetArtistById(ctx, artistId)

		if err != nil {
			return nil, err
		}

		pending.UpdateArtist(artist)

		// Update resource requests
		pending.RequestResources(characterRequests, categoryIds, mediaRequest)

		return pending, nil
	})

	err = h.pe.ReviewPostEvent(ctx, pendingPost)

	if err != nil {
		return nil, err
	}

	return nil, nil
}
