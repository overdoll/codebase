package ports

import (
	"context"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/command"
)

func InitializeCommands(app func() *app.Application) []*cobra.Command {

	generateBannerRootCmd := &cobra.Command{
		Use: "generate-banner",
	}

	generateBannerRootCmd.AddCommand(&cobra.Command{
		Use:  "club [post_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			if err := app().Commands.GenerateClubBanner.Handle(context.Background(), command.GenerateClubBanner{
				PostId: args[0],
			}); err != nil {
				zap.S().Fatalw("failed to generate club banner", zap.Error(err))
			}
		},
	})

	generateBannerRootCmd.AddCommand(&cobra.Command{
		Use:  "character [character_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			if err := app().Commands.GenerateCharacterBanner.Handle(context.Background(), command.GenerateCharacterBanner{
				CharacterId: args[0],
				Duration:    0,
			}); err != nil {
				zap.S().Fatalw("failed to generate character banner", zap.Error(err))
			}
		},
	})

	generateBannerRootCmd.AddCommand(&cobra.Command{
		Use:  "series [series_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			if err := app().Commands.GenerateSeriesBanner.Handle(context.Background(), command.GenerateSeriesBanner{
				SeriesId: args[0],
				Duration: 0,
			}); err != nil {
				zap.S().Fatalw("failed to generate series banner", zap.Error(err))
			}
		},
	})

	generateBannerRootCmd.AddCommand(&cobra.Command{
		Use:  "category [category_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			if err := app().Commands.GenerateCategoryBanner.Handle(context.Background(), command.GenerateCategoryBanner{
				CategoryId: args[0],
				Duration:   0,
			}); err != nil {
				zap.S().Fatalw("failed to generate category banner", zap.Error(err))
			}
		},
	})

	return []*cobra.Command{generateBannerRootCmd}
}
