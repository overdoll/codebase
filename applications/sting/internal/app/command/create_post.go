package command

import (
	"context"
	"errors"
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
	parley ParleyService
	eva    EvaService
	stella StellaService
}

func NewCreatePostHandler(pr post.Repository, pi post.IndexRepository, eva EvaService, parley ParleyService, stella StellaService) CreatePostHandler {
	return CreatePostHandler{pr: pr, pi: pi, eva: eva, parley: parley, stella: stella}
}

func (h CreatePostHandler) Handle(ctx context.Context, cmd CreatePost) (*post.Post, error) {

	validClub, err := h.stella.CanAccountPostUnderClub(ctx, cmd.ClubId, cmd.Principal.AccountId())

	if err != nil {
		return nil, err
	}

	if !validClub {
		return nil, errors.New("bad club given")
	}

	pendingPost, err := post.NewPost(cmd.Principal, cmd.ClubId)

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
