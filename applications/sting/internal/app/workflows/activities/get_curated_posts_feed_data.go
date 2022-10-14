package activities

import (
	"context"
	"time"
)

type GetCuratedPostsFeedDataInput struct {
	AccountId string
}

type GetCuratedPostsFeedDataPayload struct {
	NextFeedGenerationTime *time.Time
}

func (h *Activities) GetCuratedPostsFeedData(ctx context.Context, input GetCuratedPostsFeedDataInput) (*GetCuratedPostsFeedDataPayload, error) {

	data, err := h.cur.GetCuratedPostsFeedDataOperator(ctx, input.AccountId)
	if err != nil {
		return nil, err
	}

	return &GetCuratedPostsFeedDataPayload{
		NextFeedGenerationTime: data.NextRegenerationTime(),
	}, nil
}
