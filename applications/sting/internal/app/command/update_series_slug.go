package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type UpdateSeriesSlug struct {
	SeriesId       string
	Slug           string
	KeepOld        bool
	IgnoreConflict bool
}

type UpdateSeriesSlugHandler struct {
	pr post.Repository
}

func NewUpdateSeriesSlugHandler(pr post.Repository) UpdateSeriesSlugHandler {
	return UpdateSeriesSlugHandler{pr: pr}
}

func (h UpdateSeriesSlugHandler) Handle(ctx context.Context, cmd UpdateSeriesSlug) error {
	return nil
}
