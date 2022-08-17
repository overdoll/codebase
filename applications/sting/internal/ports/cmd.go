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

	generateCharacterBannerCommand := &cobra.Command{
		Use:  "character [character_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			postId, _ := cmd.Flags().GetString("post_id")
			if err := app().Commands.GenerateCharacterBanner.Handle(context.Background(), command.GenerateCharacterBanner{
				CharacterId: args[0],
				PostId:      postId,
				Duration:    0,
			}); err != nil {
				zap.S().Fatalw("failed to generate character banner", zap.Error(err))
			}
		},
	}
	generateCharacterBannerCommand.PersistentFlags().String("post_id", "", "Select a specific post.")
	generateBannerRootCmd.AddCommand(generateCharacterBannerCommand)

	generateSeriesBannerCommand := &cobra.Command{
		Use:  "series [series_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			postId, _ := cmd.Flags().GetString("post_id")
			if err := app().Commands.GenerateSeriesBanner.Handle(context.Background(), command.GenerateSeriesBanner{
				SeriesId: args[0],
				PostId:   postId,
				Duration: 0,
			}); err != nil {
				zap.S().Fatalw("failed to generate series banner", zap.Error(err))
			}
		},
	}
	generateSeriesBannerCommand.PersistentFlags().String("post_id", "", "Select a specific post.")
	generateBannerRootCmd.AddCommand(generateSeriesBannerCommand)

	generateCategoryBannerCommand := &cobra.Command{
		Use:  "category [category_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			postId, _ := cmd.Flags().GetString("post_id")
			if err := app().Commands.GenerateCategoryBanner.Handle(context.Background(), command.GenerateCategoryBanner{
				CategoryId: args[0],
				PostId:     postId,
				Duration:   0,
			}); err != nil {
				zap.S().Fatalw("failed to generate category banner", zap.Error(err))
			}
		},
	}
	generateCategoryBannerCommand.PersistentFlags().String("post_id", "", "Select a specific post.")
	generateBannerRootCmd.AddCommand(generateCategoryBannerCommand)

	generateSitemap := &cobra.Command{
		Use: "generate-sitemap",
		Run: func(cmd *cobra.Command, args []string) {
			schedule, _ := cmd.Flags().GetString("schedule")
			if err := app().Commands.GenerateSitemap.Handle(context.Background(), command.GenerateSitemap{Schedule: schedule}); err != nil {
				zap.S().Fatalw("failed to generate sitemap", zap.Error(err))
			}
		},
	}

	generateSitemap.PersistentFlags().String("schedule", "", "Generate sitemap on a cron schedule.")

	updateTotalLikesForPost := &cobra.Command{
		Use:  "update-total-likes [post_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			if err := app().Commands.UpdateTotalLikesForPostTags.Handle(context.Background(), command.UpdateTotalLikesForPostTags{
				PostId: args[0],
			}); err != nil {
				zap.S().Fatalw("failed to update total likes for post", zap.Error(err))
			}
		},
	}

	updateTotalPostsForPost := &cobra.Command{
		Use:  "update-total-posts [post_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			if err := app().Commands.UpdateTotalPostsForPostTags.Handle(context.Background(), command.UpdateTotalPostsForPostTags{
				PostId: args[0],
			}); err != nil {
				zap.S().Fatalw("failed to update total posts for post", zap.Error(err))
			}
		},
	}

	return []*cobra.Command{generateBannerRootCmd, generateSitemap, updateTotalLikesForPost, updateTotalPostsForPost}
}
