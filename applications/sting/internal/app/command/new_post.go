package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type CreatePost struct {
	Principal *principal.Principal
}

type CreatePostHandler struct {
	pr     post.Repository
	parley ParleyService
	eva    EvaService
}

func NewCreatePostHandler(pr post.Repository, eva EvaService, parley ParleyService) CreatePostHandler {
	return CreatePostHandler{pr: pr, eva: eva, parley: parley}
}

func (h CreatePostHandler) Handle(ctx context.Context, cmd CreatePost) (*post.Post, error) {

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
