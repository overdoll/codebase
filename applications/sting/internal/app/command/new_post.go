package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type NewPost struct {
	Principal *principal.Principal
}

type NewPostHandler struct {
	pr     post.Repository
	parley ParleyService
	eva    EvaService
}

func NewNewPostHandler(pr post.Repository, eva EvaService, parley ParleyService) NewPostHandler {
	return NewPostHandler{pr: pr, eva: eva, parley: parley}
}

func (h NewPostHandler) Handle(ctx context.Context, cmd NewPost) (*post.Post, error) {

	pendingPost, err := post.NewPost(cmd.Principal)

	if err != nil {
		return nil, err
	}

	// create a pending post in the database with all of the data
	if err := h.pr.CreatePost(ctx, pendingPost); err != nil {
		return nil, err
	}

	return pendingPost, nil
}
