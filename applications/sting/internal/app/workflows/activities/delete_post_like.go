package activities

import (
	"context"
)

type DeletePostLikeInput struct {
	PostId    string
	AccountId string
}

func (h *Activities) DeletePostLike(ctx context.Context, input DeletePostLikeInput) error {

	if err := h.pr.DeletePostLike(ctx, input.PostId, input.AccountId); err != nil {
		return err
	}

	return nil
}
