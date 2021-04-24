package command

import (
	"context"
	"fmt"

	"overdoll/applications/sting/src/domain/category"
	"overdoll/applications/sting/src/domain/character"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/ksuid"
)

type ReviewPostHandler struct {
	pr post.Repository

	chr character.Repository
	ctr category.Repository
}

func NewReviewPostHandler(pr post.Repository, chr character.Repository, ctr category.Repository) ReviewPostHandler {
	return ReviewPostHandler{pr: pr, chr: chr, ctr: ctr}
}

func (h ReviewPostHandler) Handle(ctx context.Context, id string, artistId string, artistUsername string, categories []string, characters []string, characterRequests map[string]string, categoryRequests []string, mediaRequests []string) (*post.PostPending, error) {
	characterUuids, err := ksuid.ToUUIDArray(characters)

	if err != nil {
		return nil, fmt.Errorf("uuids not valid: %s", characters)
	}

	categoryUuids, err := ksuid.ToUUIDArray(categories)

	if err != nil {
		return nil, fmt.Errorf("uuids not valid: %s", categories)
	}

	idParse, err := ksuid.Parse(id)

	if err != nil {
		return nil, fmt.Errorf("uuid not valid: %s", id)
	}

	oldPendingPost, err := h.pr.GetPendingPost(ctx, idParse)

	if err != nil {
		return nil, fmt.Errorf("error grabbing pending post %s", err)
	}

	pendingPost, err := post.NewPendingPost(idParse, artistId, artistUsername, oldPendingPost.ContributorId(), oldPendingPost.Content(), characterUuids, categoryUuids)

	if err != nil {
		return nil, fmt.Errorf("could not create pending post: %s", err)
	}

	err = pendingPost.ValidateCharactersAndCategories(ctx, h.chr, h.ctr)

	if err != nil {
		return nil, err
	}

	// Request new resources - update it
	pendingPost.RequestResources(characterRequests, categoryRequests, mediaRequests)

	// Update pending post
	err = h.pr.UpdatePendingPost(ctx, pendingPost)

	if err != nil {
		return nil, fmt.Errorf("could not update pending post: %s", err)
	}

	// TODO: dispatch a job to publish the post

	return pendingPost, nil
}
