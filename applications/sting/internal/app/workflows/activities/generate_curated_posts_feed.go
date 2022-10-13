package activities

import (
	"context"
)

type GenerateCuratedPostsFeedInput struct {
	AccountId string
}

func (h *Activities) GenerateCuratedPostsFeed(ctx context.Context, input GenerateCuratedPostsFeedInput) error {
	return nil
}
