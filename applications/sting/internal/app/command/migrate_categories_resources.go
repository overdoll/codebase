package command

import (
	"context"
	"go.uber.org/zap"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/media"
)

type MigrateCategoriesResources struct {
	CategoryId string
}

type MigrateCategoriesResourcesHandler struct {
	pr     post.Repository
	loader LoaderService
}

func NewMigrateCategoriesResourcesHandler(pr post.Repository, loader LoaderService) MigrateCategoriesResourcesHandler {
	return MigrateCategoriesResourcesHandler{pr: pr, loader: loader}
}

func (h MigrateCategoriesResourcesHandler) Handle(ctx context.Context, cmd MigrateCategoriesResources) error {
	return h.pr.ScanCategories(ctx, cmd.CategoryId, func(char *post.Category) error {

		if char.BannerMedia() == nil {
			return nil
		}

		if !char.BannerMedia().IsLegacy() {
			return nil
		}

		newMedia, err := h.loader.ConvertResourcesToMedia(ctx, char.ID(), []*media.Media{char.BannerMedia()})

		if err != nil {
			return err
		}

		_, err = h.pr.UpdateCategoryBannerOperator(ctx, char.ID(), func(aud *post.Category) error {
			return aud.UpdateBanner(newMedia[0])
		})

		if err != nil {
			return err
		}

		zap.S().Infow("migrated category banner", zap.String("id", char.ID()))

		return nil
	})
}
