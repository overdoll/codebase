package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/media"
)

type UpdateSeriesBannerInput struct {
	SeriesId string
	PostId   string
}

func (h *Activities) UpdateSeriesBanner(ctx context.Context, input UpdateSeriesBannerInput) error {

	var pst *post.Post
	var err error

	if input.PostId != "" {
		pst, err = h.pr.GetPostByIdOperator(ctx, input.PostId)

		if err != nil {
			return err
		}
	} else {
		pst, err = h.pr.GetFirstTopPostWithoutOccupiedMedias(ctx, nil, nil, &input.SeriesId, nil)

		if err != nil {
			return err
		}
	}

	if pst == nil {
		return nil
	}

	var selectedContentResource *media.Media

	for _, cnt := range pst.Content() {
		if !cnt.IsSupporterOnly() {
			selectedContentResource = cnt.Media()
			break
		}
	}

	if selectedContentResource == nil {
		return nil
	}

	_, err = h.pr.UpdateSeriesBannerOperator(ctx, input.SeriesId, func(series *post.Series) error {

		newResource, err := h.loader.GenerateImageFromMedia(ctx, []*media.Media{selectedContentResource}, media.NewSeriesBannerMediaLink(input.SeriesId), nil)

		if err != nil {
			return err
		}

		return series.UpdateBanner(newResource[0])
	})

	if err != nil {
		return err
	}

	return h.pr.AddPostOccupiedMedia(ctx, pst, selectedContentResource)
}
