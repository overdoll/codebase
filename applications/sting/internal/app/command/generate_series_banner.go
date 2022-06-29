package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
	"time"
)

type GenerateSeriesBanner struct {
	Principal *principal.Principal

	SeriesId string
	Duration int64
}

type GenerateSeriesBannerHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewGenerateSeriesBannerHandler(pr post.Repository, event event.Repository) GenerateSeriesBannerHandler {
	return GenerateSeriesBannerHandler{pr: pr, event: event}
}

func (h GenerateSeriesBannerHandler) Handle(ctx context.Context, cmd GenerateSeriesBanner) (*post.Series, error) {

	series, err := h.pr.GetSingleSeriesById(ctx, cmd.SeriesId)

	if err != nil {
		return nil, err
	}

	if err := h.event.GenerateSeriesBanner(ctx, cmd.Principal, series, time.Duration(cmd.Duration)); err != nil {
		return nil, err
	}

	return series, nil
}
