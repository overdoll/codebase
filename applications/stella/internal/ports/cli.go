package ports

import (
	"context"
	"log"
	"overdoll/applications/stella/internal/service"
	"time"

	"github.com/spf13/cobra"
)

var Cli = &cobra.Command{
	Use: "index",
}

func init() {
	Cli.AddCommand(&cobra.Command{
		Use: "all",
		Run: func(cmd *cobra.Command, args []string) {
			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			application, cleanup := service.NewApplication(ctx)

			defer cleanup()

			if err := application.Commands.DeleteAndRecreateClubsIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}

			if err := application.Commands.DeleteAndRecreateClubMembersIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Cli.AddCommand(&cobra.Command{
		Use:   "clubs",
		Short: "Index the whole clubs table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			application, cleanup := service.NewApplication(ctx)

			defer cleanup()

			if err := application.Commands.DeleteAndRecreateClubsIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Cli.AddCommand(&cobra.Command{
		Use:   "club-members",
		Short: "Index the whole club members table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			application, cleanup := service.NewApplication(ctx)

			defer cleanup()

			if err := application.Commands.DeleteAndRecreateClubMembersIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})
}
