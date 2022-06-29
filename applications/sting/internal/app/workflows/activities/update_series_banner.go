package activities

import (
	"context"
)

type UpdateSeriesBannerInput struct {
	SeriesId string
}

func (h *Activities) UpdateSeriesBanner(ctx context.Context, input UpdateSeriesBannerInput) error {
	return nil
}
