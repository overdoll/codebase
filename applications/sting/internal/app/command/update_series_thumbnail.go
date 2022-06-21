package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type UpdateSeriesThumbnail struct {
	Principal *principal.Principal
	SeriesId  string
	Thumbnail string
}

type UpdateSeriesThumbnailHandler struct {
	pr     post.Repository
	loader LoaderService
}

func NewUpdateSeriesThumbnailHandler(pr post.Repository, loader LoaderService) UpdateSeriesThumbnailHandler {
	return UpdateSeriesThumbnailHandler{pr: pr, loader: loader}
}

func (h UpdateSeriesThumbnailHandler) Handle(ctx context.Context, cmd UpdateSeriesThumbnail) (*post.Series, error) {

	var oldResourceId string

	series, err := h.pr.UpdateSeriesThumbnail(ctx, cmd.Principal, cmd.SeriesId, func(series *post.Series) error {

		if series.ThumbnailResource() != nil {
			oldResourceId = series.ThumbnailResource().ID()
		}

		resourceIds, err := h.loader.CreateOrGetResourcesFromUploads(ctx, cmd.SeriesId, []string{cmd.Thumbnail}, false, "SERIES", true)

		if err != nil {
			return err
		}

		return series.UpdateThumbnail(cmd.Principal, resourceIds[0])
	})

	if oldResourceId != "" {
		if err := h.loader.DeleteResources(ctx, cmd.SeriesId, []string{oldResourceId}); err != nil {
			return nil, err
		}
	}

	if err != nil {
		return nil, err
	}

	return series, nil
}
