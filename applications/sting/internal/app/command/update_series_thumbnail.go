package command

import (
	"context"
	"github.com/pkg/errors"
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
	pi     post.IndexRepository
	loader LoaderService
}

func NewUpdateSeriesThumbnailHandler(pr post.Repository, pi post.IndexRepository, loader LoaderService) UpdateSeriesThumbnailHandler {
	return UpdateSeriesThumbnailHandler{pr: pr, pi: pi, loader: loader}
}

func (h UpdateSeriesThumbnailHandler) Handle(ctx context.Context, cmd UpdateSeriesThumbnail) (*post.Series, error) {

	series, err := h.pr.UpdateSeriesThumbnail(ctx, cmd.Principal, cmd.SeriesId, func(series *post.Series) error {

		resourceIds, err := h.loader.CreateOrGetResourcesFromUploads(ctx, cmd.SeriesId, []string{cmd.Thumbnail})

		if err != nil {
			return errors.Wrap(err, "failed to create or get resources from uploads")
		}

		return series.UpdateThumbnail(cmd.Principal, resourceIds[0])
	})

	if err != nil {
		return nil, err
	}

	if err := h.pi.IndexSeries(ctx, series); err != nil {
		return nil, err
	}

	return series, nil
}
