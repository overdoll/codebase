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

	updateSlug := &cobra.Command{
		Use: "update-slug",
	}

	updateSeriesSlug := &cobra.Command{
		Use:  "series [series_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			keepOld, _ := cmd.Flags().GetBool("keep_old")
			slug, _ := cmd.Flags().GetString("slug")
			if err := app().Commands.UpdateSeriesSlug.Handle(context.Background(), command.UpdateSeriesSlug{
				SeriesId: args[0],
				Slug:     slug,
				KeepOld:  keepOld,
			}); err != nil {
				zap.S().Fatalw("failed to update series slug", zap.Error(err))
			}
		},
	}
	updateSeriesSlug.PersistentFlags().Bool("keep_old", true, "Whether or not to keep the old slug.")
	updateSeriesSlug.PersistentFlags().String("slug", "", "The slug to update to. Case-sensitive.")
	updateSeriesSlug.MarkPersistentFlagRequired("keep_old")
	updateSlug.AddCommand(updateSeriesSlug)

	updateCharacterSlug := &cobra.Command{
		Use:  "character [character_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			keepOld, _ := cmd.Flags().GetBool("keep_old")
			slug, _ := cmd.Flags().GetString("slug")
			if err := app().Commands.UpdateCharacterSlug.Handle(context.Background(), command.UpdateCharacterSlug{
				CharacterId: args[0],
				Slug:        slug,
				KeepOld:     keepOld,
			}); err != nil {
				zap.S().Fatalw("failed to update character slug", zap.Error(err))
			}
		},
	}
	updateCharacterSlug.PersistentFlags().Bool("keep_old", true, "Whether or not to keep the old slug.")
	updateCharacterSlug.PersistentFlags().String("slug", "", "The slug to update to. Case-sensitive.")
	updateCharacterSlug.MarkPersistentFlagRequired("keep_old")
	updateSlug.AddCommand(updateCharacterSlug)

	updateCategorySlug := &cobra.Command{
		Use:  "category [category_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			keepOld, _ := cmd.Flags().GetBool("keep_old")
			slug, _ := cmd.Flags().GetString("slug")
			if err := app().Commands.UpdateCategorySlug.Handle(context.Background(), command.UpdateCategorySlug{
				CategoryId: args[0],
				Slug:       slug,
				KeepOld:    keepOld,
			}); err != nil {
				zap.S().Fatalw("failed to update category slug", zap.Error(err))
			}
		},
	}
	updateCategorySlug.PersistentFlags().Bool("keep_old", true, "Whether or not to keep the old slug.")
	updateCategorySlug.PersistentFlags().String("slug", "", "The slug to update to. Case-sensitive.")
	updateCategorySlug.MarkPersistentFlagRequired("keep_old")
	updateSlug.AddCommand(updateCategorySlug)

	updateTopicSlug := &cobra.Command{
		Use:  "topic [topic_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			keepOld, _ := cmd.Flags().GetBool("keep_old")
			slug, _ := cmd.Flags().GetString("slug")
			if err := app().Commands.UpdateTopicSlug.Handle(context.Background(), command.UpdateTopicSlug{
				TopicId: args[0],
				Slug:    slug,
				KeepOld: keepOld,
			}); err != nil {
				zap.S().Fatalw("failed to update topic slug", zap.Error(err))
			}
		},
	}
	updateTopicSlug.PersistentFlags().Bool("keep_old", true, "Whether or not to keep the old slug.")
	updateTopicSlug.PersistentFlags().String("slug", "", "The slug to update to. Case-sensitive.")
	updateTopicSlug.MarkPersistentFlagRequired("keep_old")
	updateSlug.AddCommand(updateTopicSlug)

	updateAudienceSlug := &cobra.Command{
		Use:  "audience [audience_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			keepOld, _ := cmd.Flags().GetBool("keep_old")
			slug, _ := cmd.Flags().GetString("slug")
			if err := app().Commands.UpdateAudienceSlug.Handle(context.Background(), command.UpdateAudienceSlug{
				AudienceId: args[0],
				Slug:       slug,
				KeepOld:    keepOld,
			}); err != nil {
				zap.S().Fatalw("failed to update audience slug", zap.Error(err))
			}
		},
	}
	updateAudienceSlug.PersistentFlags().Bool("keep_old", true, "Whether or not to keep the old slug.")
	updateAudienceSlug.PersistentFlags().String("slug", "", "The slug to update to. Case-sensitive.")
	updateAudienceSlug.MarkPersistentFlagRequired("keep_old")
	updateSlug.AddCommand(updateAudienceSlug)

	reIndex := &cobra.Command{
		Use: "re-index",
	}

	reIndex.AddCommand(&cobra.Command{
		Use:  "post [post_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			if err := app().Commands.IndexPost.Handle(context.Background(), command.IndexPost{
				PostId: args[0],
			}); err != nil {
				zap.S().Fatalw("failed to index post", zap.Error(err))
			}
		},
	})

	reIndex.AddCommand(&cobra.Command{
		Use:  "club [club_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			if err := app().Commands.IndexClub.Handle(context.Background(), command.IndexClub{
				ClubId: args[0],
			}); err != nil {
				zap.S().Fatalw("failed to index club", zap.Error(err))
			}
		},
	})

	return []*cobra.Command{generateBannerRootCmd, generateSitemap, updateTotalLikesForPost, updateTotalPostsForPost, updateSlug, reIndex}
}
