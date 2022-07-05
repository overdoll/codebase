package activities

import (
	"context"
)

type GetTagsWithoutBannerForPostInput struct {
	PostId string
}

type GetTagsWithoutBannerForPostPayload struct {
	CategoryIds  []string
	CharacterIds []string
	SeriesIds    []string
}

func (h *Activities) GetTagsWithoutBannerForPost(ctx context.Context, input GetTagsWithoutBannerForPostInput) (*GetTagsWithoutBannerForPostPayload, error) {

	pst, err := h.pr.GetPostByIdOperator(ctx, input.PostId)

	if err != nil {
		return nil, err
	}

	payload := &GetTagsWithoutBannerForPostPayload{}

	characters, err := h.pr.GetCharactersByIds(ctx, pst.CharacterIds())

	if err != nil {
		return nil, err
	}

	for _, char := range characters {
		if char.BannerResource() == nil {
			payload.CharacterIds = append(payload.CharacterIds, char.ID())
		}
	}

	series, err := h.pr.GetSeriesByIds(ctx, pst.SeriesIds())

	if err != nil {
		return nil, err
	}

	for _, serial := range series {
		if serial.BannerResource() == nil {
			payload.SeriesIds = append(payload.SeriesIds, serial.ID())
		}
	}

	categories, err := h.pr.GetCategoriesByIds(ctx, pst.CategoryIds())

	if err != nil {
		return nil, err
	}

	for _, cat := range categories {
		if cat.BannerResource() == nil {
			payload.CategoryIds = append(payload.CategoryIds, cat.ID())
		}
	}

	return payload, nil
}
