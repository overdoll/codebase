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

	eva EvaService
}

func NewNewPostHandler(pr post.Repository, chr character.Repository, ctr category.Repository, cr content.Repository, eva EvaService) NewPostHandler {
	return NewPostHandler{pr: pr, chr: chr, ctr: ctr, cr: cr, eva: eva}
}

func (h NewPostHandler) Handle(ctx context.Context, artistId string, artistUsername string, contributorId string, content []string, categories []string, characters []string, characterRequests map[string]string, categoryRequests []string, mediaRequests []string) (*post.PostPending, error) {

	characterUuids, err := ksuid.ToUUIDArray(characters)

	if err != nil {
		return nil, fmt.Errorf("uuids not valid: %s", characters)
	}

	categoryUuids, err := ksuid.ToUUIDArray(categories)

	if err != nil {
		return nil, fmt.Errorf("uuids not valid: %s", categories)
	}

	contributorParse, err := ksuid.Parse(contributorId)

	if err != nil {
		return nil, fmt.Errorf("uuid not valid: %s", contributorId)
	}

	pendingPost, err := post.NewPendingPost(ksuid.New(), artistId, artistUsername, contributorParse, content, characterUuids, categoryUuids)

	if err != nil {
		return nil, fmt.Errorf("could not create pending post: %s", err)
	}

	err = pendingPost.ValidateCharactersAndCategories(ctx, h.chr, h.ctr)

	if err != nil {
		return nil, err
	}

	// Request new resources
	pendingPost.RequestResources(characterRequests, categoryRequests, mediaRequests)

	usr, err := h.eva.GetUser(ctx, contributorId)

	if err != nil {
		return nil, fmt.Errorf("could not get user: %s", err)
	}

	_ = pendingPost.MakePublicOrReview(usr)

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

	// If not in review ("publishing"), then we dispatch a job to publish the post
	if !pendingPost.InReview() {
		// TODO: dispatch a job if review not required to publish the post
	}

	return pendingPost, nil
}
