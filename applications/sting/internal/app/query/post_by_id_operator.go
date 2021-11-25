package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type PostByIdOperator struct {
	Id string
}

type PostByIdOperatorHandler struct {
	pr post.Repository
}

func NewPostByIdOperatorHandler(pr post.Repository) PostByIdOperatorHandler {
	return PostByIdOperatorHandler{pr: pr}
}

func (h PostByIdOperatorHandler) Handle(ctx context.Context, query PostById) (*post.Post, error) {

	pst, err := h.pr.GetPostByIdOperator(ctx, query.Id)

	if err != nil {
		return nil, err
	}

	return pst, nil
}
