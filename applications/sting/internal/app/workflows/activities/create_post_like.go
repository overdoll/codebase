package activities

import (
	"context"
	"time"

	"overdoll/applications/sting/internal/domain/post"
)

type CreatePostLikeInput struct {
	PostId    string
	AccountId string
	LikedAt   time.Time
}

func (h *Activities) CreatePostLike(ctx context.Context, input CreatePostLikeInput) error {

	like := post.UnmarshalLikeFromDatabase(input.AccountId, input.PostId, input.LikedAt)

	if err := h.pr.CreatePostLike(ctx, like); err != nil {
		return err
	}

	return nil
}
