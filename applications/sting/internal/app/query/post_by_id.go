package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type PostById struct {
	Id        string
	Principal *principal.Principal
}

type PostByIdHandler struct {
	pr     post.Repository
	stella StellaService
}

func NewPostByIdHandler(pr post.Repository, stella StellaService) PostByIdHandler {
	return PostByIdHandler{pr: pr, stella: stella}
}

func (h PostByIdHandler) Handle(ctx context.Context, query PostById) (*post.Post, error) {

	var accountId string

	if query.Principal != nil {
		accountId = query.Principal.AccountId()
	}

	pst, err := h.pr.GetPostById(ctx, query.Principal, query.Id)

	if err != nil {
		return nil, err
	}

	// a simple permission check for posts
	allowed, err := h.stella.CanAccountViewPostUnderClub(ctx, pst.ClubId(), accountId)

	if err != nil {
		return nil, err
	}

	if !allowed {
		return nil, post.ErrNotFound
	}

	return pst, nil
}
