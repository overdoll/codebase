package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
	"time"
)

type GenerateSeriesBanner struct {
	SeriesId string
	PostId   string
	Duration int64
}

type GenerateSeriesBannerHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewGenerateSeriesBannerHandler(pr post.Repository, event event.Repository) GenerateSeriesBannerHandler {
	return GenerateSeriesBannerHandler{pr: pr, event: event}
}

func (h GenerateSeriesBannerHandler) Handle(ctx context.Context, cmd GenerateSeriesBanner) error {

	series, err := h.pr.GetSingleSeriesById(ctx, cmd.SeriesId)

	if err != nil {
		return err
	}

	var pst *post.Post

	if cmd.PostId != "" {
		pst, err = h.pr.GetPostByIdOperator(ctx, cmd.PostId)

		if err != nil {
			return err
		}
	}

	if err := h.event.GenerateSeriesBanner(ctx, series, pst, time.Duration(cmd.Duration)); err != nil {
		return err
	}

	return nil
}
