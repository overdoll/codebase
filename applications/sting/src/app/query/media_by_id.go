package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

var (
	errFailedMediaById = errors.New("media by id failed")
)

type MediaByIdHandler struct {
	pr post.Repository
}

func NewMediaByIdHandler(pr post.Repository) MediaByIdHandler {
	return MediaByIdHandler{pr: pr}
}

func (h MediaByIdHandler) Handle(ctx context.Context, mediaId string) (*post.Media, error) {

	result, err := h.pr.GetMediaById(ctx, mediaId)

	if err != nil {
		zap.S().Errorf("failed to get media: %s", err)
		return nil, errFailedMediaById
	}

	return result, nil
}
