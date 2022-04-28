package command

import (
	"context"
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
	stella StellaService
}

func NewCreatePostHandler(pr post.Repository, pi post.IndexRepository, stella StellaService) CreatePostHandler {
	return CreatePostHandler{pr: pr, pi: pi, stella: stella}
}

func (h CreatePostHandler) Handle(ctx context.Context, cmd CreatePost) (*post.Post, error) {

	club, err := h.stella.GetClubById(ctx, cmd.ClubId)

	if err != nil {
		return nil, err
	}

	pendingPost, err := post.NewPost(cmd.Principal, club)

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
