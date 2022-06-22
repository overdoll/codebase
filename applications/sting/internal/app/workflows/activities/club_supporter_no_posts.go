package activities

import (
	"context"
)

type ClubSupporterNoPostsInput struct {
	ClubId string
}

func (h *Activities) ClubSupporterNoPosts(ctx context.Context, input ClubSupporterNoPostsInput) error {

	clb, err := h.cr.GetClubById(ctx, input.ClubId)

	if err != nil {
		return err
	}

	if clb.NextSupporterPostTime() == nil {
		return nil
	}

	return h.carrier.ClubSupporterNoPosts(ctx, input.ClubId)
}
