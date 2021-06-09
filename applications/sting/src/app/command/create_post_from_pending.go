package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type CreatePostHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewCreatePostHandler(pr post.Repository, pi post.IndexRepository) CreatePostHandler {
	return CreatePostHandler{pr: pr, pi: pi}
}

func (h CreatePostHandler) Handle(ctx context.Context, id string) error {

	pendingPost, err := h.pr.GetPendingPost(ctx, id)

	if err != nil {
		return err
	}

	pst := post.NewPost(id, pendingPost.Artist(), pendingPost.Contributor(), pendingPost.Content(), pendingPost.Categories(), pendingPost.Characters())

	if err := h.pr.CreatePost(ctx, pst); err != nil {
		return err
	}

	return h.pi.IndexPost(ctx, pst)
}
