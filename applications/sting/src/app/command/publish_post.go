package command

import (
	"context"
	"fmt"

	"overdoll/applications/sting/src/domain/category"
	"overdoll/applications/sting/src/domain/character"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/ksuid"
)

type PublishPostHandler struct {
	pr post.Repository
	chr character.Repository
	ctr category.Repository
}

func NewPublishPostHandler(pr post.Repository, chr character.Repository, ctr category.Repository) PublishPostHandler {
	return PublishPostHandler{pr: pr, chr: chr, ctr: ctr}
}

func (h PublishPostHandler) Handle(ctx context.Context, id string) (*post.PostPending, error) {
	idParse, err := ksuid.Parse(id)

	if err != nil {
		return nil, fmt.Errorf("uuid not valid: %s", id)
	}

	pendingPost, err := h.pr.GetPendingPost(ctx, idParse)

	if err != nil {
		return nil, fmt.Errorf("could not get pending post: %s", err)
	}

	cats := pendingPost.ConsumeCustomCategories()

	err = h.ctr.CreateCategories(ctx, cats)

	if err != nil {
		return nil, fmt.Errorf("could not create categories: %s", err)
	}

	chars, medias := pendingPost.ConsumeCustomCharacters()

	err = h.chr.CreateCharacters(ctx, chars)

	if err != nil {
		return nil, fmt.Errorf("could not create characters: %s", err)
	}

	err = h.chr.CreateMedias(ctx, medias)

	if err != nil {
		return nil, fmt.Errorf("could not create medias: %s", err)
	}

	// publish post
	err = pendingPost.Publish()

	if err != nil {
		return nil, err
	}

	err = h.pr.UpdatePendingPost(ctx, pendingPost)

	if err != nil {
		return nil, fmt.Errorf("unable to update pending post: %s", err)
	}

	return pendingPost, nil
}
