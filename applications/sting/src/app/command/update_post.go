package command

import (
	"context"
	"errors"

	"overdoll/applications/sting/src/domain/post"
)

var (
	ErrReviewFailed = errors.New("review failed")
)

type UpdatePostHandler struct {
	pr post.Repository
}

func NewUpdatePendingPostHandler(pr post.Repository) UpdatePostHandler {
	return UpdatePostHandler{pr: pr}
}

func (h UpdatePostHandler) Handle(ctx context.Context, id, artistId string, characterIds, categoryIds []string, characterRequests map[string]string, mediaRequest, categoryRequests []string) (*post.Post, error) {

	// Update pending post with new values
	pendingPost, err := h.pr.UpdatePost(ctx, id, func(pending *post.Post) error {

		// Need to grab this since our protobuf only contains references to IDs
		characters, err := h.pr.GetCharactersById(ctx, characterIds)

		if err != nil {
			return err
		}

		err = pending.UpdateCharacters(characters)

		if err != nil {
			return err
		}

		categories, err := h.pr.GetCategoriesById(ctx, categoryIds)

		if err != nil {
			return err
		}

		err = pending.UpdateCategories(categories)

		if err != nil {
			return err
		}

		// need to grab artist, to ensure it's valid
		artist, err := h.pr.GetArtistById(ctx, artistId)

		if err != nil {
			return err
		}

		pending.UpdateArtist(artist)

		// Update resource requests
		pending.RequestResources(characterRequests, categoryIds, mediaRequest)

		return nil
	})

	if err != nil {
		return nil, err
	}

	return pendingPost, nil
}
