package ports

import (
	"context"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/app/command"
)

func InitializeCommands(getApp func() *app.Application) []*cobra.Command {

	rootCmd := &cobra.Command{
		Use: "resource",
	}

	reprocessCmd := &cobra.Command{
		Use: "reprocess [item_id] [id]",
		Run: func(cmd *cobra.Command, args []string) {

			if len(args) != 2 {
				zap.S().Fatal("must include [item_id] and [id] of resource to reprocess")
			}

			width, _ := cmd.Flags().GetInt64("width")
			height, _ := cmd.Flags().GetInt64("height")
			source, _ := cmd.Flags().GetString("source")

			if err := getApp().Commands.ReprocessResource.Handle(context.Background(), command.ReprocessResource{
				ItemId: args[0],
				Id:     args[1],
				Width:  uint64(width),
				Height: uint64(height),
				Source: source,
			}); err != nil {
				zap.S().Fatalw("failed to reprocess resource", zap.Error(err))
			}
		},
	}

	reprocessCmd.PersistentFlags().Int64("width", 0, "Width to process to.")
	reprocessCmd.PersistentFlags().Int64("height", 0, "Height to process to.")
	reprocessCmd.PersistentFlags().String("source", "STING", "Source to use.")

	rootCmd.AddCommand(reprocessCmd)

	return []*cobra.Command{rootCmd}
}
