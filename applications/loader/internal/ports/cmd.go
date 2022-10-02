package ports

import (
	"context"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/app/command"
	"overdoll/libraries/media/proto"
)

func InitializeCommands(app func() *app.Application) []*cobra.Command {

	reprocessData := &cobra.Command{
		Use: "reprocess [linked_id] [media_id]",
		Run: func(cmd *cobra.Command, args []string) {

			var uploadIds []string

			if len(args) > 1 {
				uploadIds = append(uploadIds, args[1])
			}

			_, err := app().Commands.ProcessMediaFromUploads.Handle(context.Background(), command.ProcessMediaFromUploads{
				Link:      &proto.MediaLink{Id: args[0]},
				UploadIds: uploadIds,
				Source:    "STING",
				Reprocess: true,
			})

			if err != nil {
				zap.S().Fatalw("failed to reprocess medias", zap.Error(err))
			}
		},
	}

	return []*cobra.Command{reprocessData}
}
