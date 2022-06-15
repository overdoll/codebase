package activities

import (
	"context"
)

type ClubSupporterNoPostsInput struct {
	ClubId string
}

func (h *Activities) ClubSupporterNoPosts(ctx context.Context, input ClubSupporterNoPostsInput) error {
	return h.carrier.ClubSupporterNoPosts(ctx, input.ClubId)
}
