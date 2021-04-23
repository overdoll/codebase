package command

import (
	"context"

	"overdoll/applications/sting/src/domain/content"
	"overdoll/applications/sting/src/domain/post"
)

type NewPostHandler struct {
	pr post.Repository
	cr content.Repository
}

func NewNewPostHandler(pr post.Repository) NewPostHandler {
	return NewPostHandler{pr: pr}
}

func (h NewPostHandler) Handle(ctx context.Context, email string, session string) (*post.PostPending, error) {

	// TODO: move images

	// TODO: create in DB

	return nil, nil
}
