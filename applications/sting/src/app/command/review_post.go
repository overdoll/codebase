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

	characterInstances, err := h.chr.GetCharactersById(ctx, characterUuids)

	if err != nil {
		return nil, err
	}

	// make sure that the submitted characters are found in the database
	if len(characterInstances) != len(characterUuids) {
		return nil, fmt.Errorf("invalid character found")
	}

	categoryUuids, err := ksuid.ToUUIDArray(categories)

	if err != nil {
		return nil, fmt.Errorf("uuids not valid: %s", categories)
	}

	categoryInstances, err := h.ctr.GetCategoriesById(ctx, categoryUuids)

	if err != nil {
		return nil, err
	}

	// make sure that the submitted categories exist in the database
	if len(categoryInstances) != len(categoryUuids) {
		return nil, fmt.Errorf("invalid category found")
	}

	// TODO: dispatch job to publish post

	return nil, nil
}
