package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type CreatePost struct {
	Principal *principal.Principal
	ClubId    string
}

type CreatePostHandler struct {
	pr     post.Repository
	pi     post.IndexRepository
	cr     club.Repository
	parley ParleyService
	eva    EvaService
}

func NewCreatePostHandler(pr post.Repository, cr club.Repository, pi post.IndexRepository, eva EvaService, parley ParleyService) CreatePostHandler {
	return CreatePostHandler{pr: pr, cr: cr, pi: pi, eva: eva, parley: parley}
}

func (h CreatePostHandler) Handle(ctx context.Context, cmd CreatePost) (*post.Post, error) {

	cl, err := h.cr.GetClubById(ctx, cmd.ClubId)

	if err != nil {
		return nil, err
	}

	pendingPost, err := post.NewPost(cmd.Principal, cl)

	if err != nil {
		return nil, err
	}

	// create a pending post in the database with all the data
	if err := h.pr.CreatePost(ctx, pendingPost); err != nil {
		return nil, err
	}

	// index the post
	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return nil, err
	}

	return pendingPost, nil
}
