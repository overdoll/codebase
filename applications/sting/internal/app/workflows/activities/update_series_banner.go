package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/resource"
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

	var selectedContentResource *resource.Resource

	for _, cnt := range pst.Content() {
		if !cnt.IsSupporterOnly() {
			selectedContentResource = cnt.Resource()
			break
		}
	}

	if selectedContentResource == nil {
		return nil
	}

	_, err = h.pr.UpdateSeriesBannerOperator(ctx, input.SeriesId, func(series *post.Series) error {

		newResource, err := h.loader.CopyResourceIntoImage(ctx, pst.ID(), selectedContentResource.ID(), false, "SERIES_BANNER", 480, 640, series.ID())

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
