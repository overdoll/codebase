package command

import (
	"context"
	"fmt"

	"overdoll/applications/sting/src/domain/category"
	"overdoll/applications/sting/src/domain/character"
	"overdoll/applications/sting/src/domain/content"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/ksuid"
)

type NewPostHandler struct {
	pr  post.Repository
	chr character.Repository
	ctr category.Repository

	cr content.Repository
}

func NewNewPostHandler(pr post.Repository) NewPostHandler {
	return NewPostHandler{pr: pr}
}

func (h NewPostHandler) Handle(ctx context.Context, artistId string, artistUsername string, contributorId string, content []string, categories []string, characters []string, characterRequests map[string]string, categoryRequests []string, mediaRequests []string) (*post.PostPending, error) {

	characterUuids, err := ksuid.ToUUIDArray(characters)

	if err != nil {
		return nil, fmt.Errorf("uuids not valid: %s", characters)
	}

	characterInstances, err := h.chr.GetCharacters(ctx, characterUuids)

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

	categoryInstances, err := h.ctr.GetCategories(ctx, categoryUuids)

	if err != nil {
		return nil, err
	}

	// make sure that the submitted categories exist in the database
	if len(categoryInstances) != len(categoryUuids) {
		return nil, fmt.Errorf("invalid category found")
	}

	contributorParse, err := ksuid.Parse(contributorId)

	if err != nil {
		return nil, fmt.Errorf("uuid not valid: %s", contributorId)
	}

	pendingPost, err := post.NewPendingPost(ksuid.New(), artistId, artistUsername, contributorParse, content, characterUuids, categoryUuids)

	if err != nil {
		return nil, fmt.Errorf("could not create pending post: %s", err)
	}

	// TODO: call users service, to determine if review is required, or do some permission checks
	_ = pendingPost.MakePublic()

	// TODO: add media, character, category requests to state

	// Process content (mime-type checks, etc...)
	cnt, err := h.cr.ProcessContent(ctx, contributorId, content)

	if err != nil {
		return nil, fmt.Errorf("unable to process content: %s", err)
	}

	// update content
	pendingPost.UpdateContent(cnt)

	// create a pending post in the database with all of the data
	err = h.pr.CreatePendingPost(ctx, pendingPost)

	if err != nil {
		return nil, err
	}

	// TODO: dispatch a job if review not required to publish the post

	return pendingPost, nil
}
