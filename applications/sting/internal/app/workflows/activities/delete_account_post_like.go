package activities

import (
	"context"
)

type DeleteAccountPostLikeInput struct {
	PostId    string
	AccountId string
}

func (h *Activities) DeleteAccountPostLike(ctx context.Context, input DeleteAccountPostLikeInput) error {
	return h.pr.DeleteAccountPostLike(ctx, input.AccountId, input.PostId)
}
