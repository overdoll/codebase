package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type UpdateSeriesBannerInput struct {
	SeriesId string
}

func (h *Activities) UpdateSeriesBanner(ctx context.Context, input UpdateSeriesBannerInput) error {

	pst, err := h.pr.GetFirstTopPostWithoutOccupiedResources(ctx, nil, nil, &input.SeriesId, nil)

	if err != nil {
		return err
	}

	if pst == nil {
		return nil
	}

	selectedContentResource := pst.Content()[0].Resource()

	_, err = h.pr.UpdateSeriesBannerOperator(ctx, input.SeriesId, func(series *post.Series) error {

		newResource, err := h.loader.CopyResourceIntoImage(ctx, pst.ID(), selectedContentResource.ID(), false)

		if err != nil {
			return err
		}

		return series.UpdateBanner(newResource.NewResource())
	})

	if err != nil {
		return err
	}

	return h.pr.AddPostOccupiedResource(ctx, pst, selectedContentResource)
}
