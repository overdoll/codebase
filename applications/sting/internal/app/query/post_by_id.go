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
	pr post.Repository
}

func NewPostByIdHandler(pr post.Repository) PostByIdHandler {
	return PostByIdHandler{pr: pr}
}

func (h PostByIdHandler) Handle(ctx context.Context, query PostById) (*post.Post, error) {

	pst, err := h.pr.GetPost(ctx, query.Principal, query.Id)

	if err != nil {
		return nil, err
	}

	return pst, nil
}
