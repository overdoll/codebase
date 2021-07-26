package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/sting/internal/domain/post"
)

var (
	errFailedPostById = errors.New("post by id failed")
)

type PostByIdHandler struct {
	pr post.Repository
}

func NewPostByIdHandler(pr post.Repository) PostByIdHandler {
	return PostByIdHandler{pr: pr}
}

func (h PostByIdHandler) Handle(ctx context.Context, postId string) (*post.Post, error) {

	pst, err := h.pr.GetPost(ctx, postId)

	if err != nil {
		zap.S().Errorf("failed to get post: %s", err)
		return nil, errFailedPostById
	}

	return pst, nil
}
