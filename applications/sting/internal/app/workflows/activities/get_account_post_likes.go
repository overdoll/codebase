package activities

import (
	"context"
)

type GetAccountPostLikesInput struct {
	AccountId string
}

type GetAccountPostLikesPayload struct {
	PostIds []string
}

func (h *Activities) GetAccountPostLikes(ctx context.Context, input GetAccountPostLikesInput) (*GetAccountPostLikesPayload, error) {

	postLikes, err := h.pr.GetAccountPostLikes(ctx, input.AccountId)

	if err != nil {
		return nil, err
	}

	return &GetAccountPostLikesPayload{PostIds: postLikes}, nil
}
