package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type SeriesById struct {
	SeriesId string
}

type SeriesByIdHandler struct {
	pr post.Repository
}

func NewSeriesByIdHandler(pr post.Repository) SeriesByIdHandler {
	return SeriesByIdHandler{pr: pr}
}

func (h SeriesByIdHandler) Handle(ctx context.Context, query SeriesById) (*post.Series, error) {

	result, err := h.pr.GetSingleSeriesById(ctx, query.SeriesId)

	if err != nil {
		return nil, err
	}

	return result, nil
}
