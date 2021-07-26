package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/sting/internal/domain/post"
)

var (
	errFailedArtistById = errors.New("artist by id failed")
)

type ArtistByIdHandler struct {
	pr post.Repository
}

func NewArtistByIdHandler(pr post.Repository) ArtistByIdHandler {
	return ArtistByIdHandler{pr: pr}
}

func (h ArtistByIdHandler) Handle(ctx context.Context, artistId string) (*post.Artist, error) {

	result, err := h.pr.GetArtistById(ctx, artistId)

	if err != nil {
		zap.S().Errorf("failed to get artist: %s", err)
		return nil, errFailedArtistById
	}

	return result, nil
}
