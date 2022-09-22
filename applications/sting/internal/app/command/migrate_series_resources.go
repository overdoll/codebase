package command

import (
	"context"
	"go.uber.org/zap"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/media"
)

type MigrateSeriesResources struct {
	SeriesId string
}

type MigrateSeriesResourcesHandler struct {
	pr     post.Repository
	loader LoaderService
}

func NewMigrateSeriesResourcesHandler(pr post.Repository, loader LoaderService) MigrateSeriesResourcesHandler {
	return MigrateSeriesResourcesHandler{pr: pr, loader: loader}
}

func (h MigrateSeriesResourcesHandler) Handle(ctx context.Context, cmd MigrateSeriesResources) error {
	return h.pr.ScanSeries(ctx, cmd.SeriesId, func(char *post.Series) error {

		if !char.BannerMedia().IsLegacy() {
			return nil
		}

		newMedia, err := h.loader.ConvertResourcesToMedia(ctx, char.ID(), []*media.Media{char.BannerMedia()})

		if err != nil {
			return err
		}

		_, err = h.pr.UpdateSeriesBannerOperator(ctx, char.ID(), func(aud *post.Series) error {
			return aud.UpdateBanner(newMedia[0])
		})

		if err != nil {
			return err
		}

		zap.S().Infow("migrated series banner", zap.String("id", char.ID()))

		return nil
	})
}
