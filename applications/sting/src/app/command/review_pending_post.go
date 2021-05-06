package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

var (
	ErrReviewFailed = errors.New("review failed")
)

type ReviewPostHandler struct {
	pr post.Repository
}

func NewReviewPostHandler(pr post.Repository) ReviewPostHandler {
	return ReviewPostHandler{pr: pr}
}

func (h ReviewPostHandler) Handle(ctx context.Context, id string, artistId string, characterIds []string, categoryIds []string, characterRequests map[string]string, mediaRequest []string, categoryRequests []string) (*post.PostPending, error) {
	// Update pending post with new values
	pendingPost, err := h.pr.UpdatePendingPost(ctx, id, func(pending *post.PostPending) (*post.PostPending, error) {

		// Need to grab this since our protobuf only contains references to IDs
		characters, err := h.pr.GetCharactersById(ctx, characterIds)

		if err != nil {
			return nil, ErrReviewFailed
		}

		err = pending.UpdateCharacters(characters)

		if err != nil {
			return nil, err
		}

		categories, err := h.pr.GetCategoriesById(ctx, categoryIds)

		if err != nil {
			return nil, ErrReviewFailed
		}

		err = pending.UpdateCategories(categories)

		if err != nil {
			return nil, err
		}

		// need to grab artist, to ensure it's valid
		artist, err := h.pr.GetArtistById(ctx, artistId)

		if err != nil {
			return nil, ErrReviewFailed
		}

		pending.UpdateArtist(artist)

		// Update resource requests
		pending.RequestResources(characterRequests, categoryIds, mediaRequest)

		// mark the state of the post to be publishing
		pending.MakePublishing()

		return pending, nil
	})

	if err != nil {
		zap.S().Errorf("failed to update post: %s", err)
		return nil, ErrReviewFailed
	}

	// TODO: post completed workflow

	return pendingPost, nil
}
