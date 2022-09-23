package query

import (
	"context"
	"overdoll/applications/loader/internal/domain/progress"
)

type MediaProgressByIds struct {
	LinkedIds []string
	MediaIds  []string
}

type MediaProgressByIdsHandler struct {
	pr progress.Repository
}

func NewMediaProgressByIdsHandler(pr progress.Repository) MediaProgressByIdsHandler {
	return MediaProgressByIdsHandler{pr: pr}
}

func (h MediaProgressByIdsHandler) Handle(ctx context.Context, query MediaProgressByIds) ([]*progress.Progress, error) {
	return h.pr.GetProgressForMedia(ctx, query.LinkedIds, query.MediaIds)
}
