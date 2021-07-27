package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type ArtistById struct {
	AccountId string
}

type ArtistByIdHandler struct {
	pr post.Repository
}

func NewArtistByIdHandler(pr post.Repository) ArtistByIdHandler {
	return ArtistByIdHandler{pr: pr}
}

func (h ArtistByIdHandler) Handle(ctx context.Context, cmd ArtistById) (*post.Artist, error) {

	result, err := h.pr.GetArtistById(ctx, cmd.AccountId)

	if err != nil {
		return nil, err
	}

	return result, nil
}
