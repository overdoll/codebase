package command

import (
	"context"
	"go.uber.org/zap"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/media"
)

type MigrateCharactersResources struct {
	CharacterId string
}

type MigrateCharactersResourcesHandler struct {
	pr     post.Repository
	loader LoaderService
}

func NewMigrateCharactersResourcesHandler(pr post.Repository, loader LoaderService) MigrateCharactersResourcesHandler {
	return MigrateCharactersResourcesHandler{pr: pr, loader: loader}
}

func (h MigrateCharactersResourcesHandler) Handle(ctx context.Context, cmd MigrateCharactersResources) error {
	return h.pr.ScanCharacters(ctx, cmd.CharacterId, func(char *post.Character) error {

		if !char.BannerMedia().IsLegacy() {
			return nil
		}

		newMedia, err := h.loader.ConvertResourcesToMedia(ctx, char.ID(), []*media.Media{char.BannerMedia()})

		if err != nil {
			return err
		}

		_, err = h.pr.UpdateCharacterBannerOperator(ctx, char.ID(), func(aud *post.Character) error {
			return aud.UpdateBanner(newMedia[0])
		})

		if err != nil {
			return err
		}

		zap.S().Infow("migrated characters banner", zap.String("id", char.ID()))

		return nil
	})
}
