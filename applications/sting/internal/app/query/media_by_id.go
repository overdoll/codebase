package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type MediaById struct {
	MediaId string
}

type MediaByIdHandler struct {
	pr post.Repository
}

func NewMediaByIdHandler(pr post.Repository) MediaByIdHandler {
	return MediaByIdHandler{pr: pr}
}

func (h MediaByIdHandler) Handle(ctx context.Context, query MediaById) (*post.Media, error) {

	result, err := h.pr.GetMediaById(ctx, query.MediaId)

	if err != nil {
		return nil, err
	}

	return result, nil
}