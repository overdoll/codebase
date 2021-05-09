package activities

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type CreatePostActivityHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewCreatePostActivityHandler(pr post.Repository, pi post.IndexRepository) CreatePostActivityHandler {
	return CreatePostActivityHandler{pr: pr, pi: pi}
}

func (h CreatePostActivityHandler) Handle(ctx context.Context, id string) error {

	pendingPost, err := h.pr.GetPendingPost(ctx, id)

	if err != nil {
		return err
	}

	pst := post.NewPost(id, pendingPost.Artist(), pendingPost.Contributor(), pendingPost.Content(), pendingPost.Categories(), pendingPost.Characters())

	if err := h.pr.CreatePost(ctx, pst); err != nil {
		return err
	}

	if err := h.pi.IndexPost(ctx, pst); err != nil {
		return err
	}

	return nil
}
