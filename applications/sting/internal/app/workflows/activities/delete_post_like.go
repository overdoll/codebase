package activities

import (
	"context"
)

type DeletePostLikeInput struct {
	PostId    string
	AccountId string
}

func (h *Activities) DeletePostLike(ctx context.Context, input DeletePostLikeInput) error {

	like, err := h.pr.GetPostLikeByIdOperator(ctx, input.PostId, input.AccountId)

	if err != nil {
		return err
	}

	if err := h.pr.DeletePostLike(ctx, like); err != nil {
		return err
	}

	return nil
}
