package ports

import (
	"context"
	"log"
	"overdoll/applications/parley/internal/service"
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

			if err := application.Commands.DeleteAndRecreatePostReportsIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Cli.AddCommand(&cobra.Command{
		Use:   "post-reports",
		Short: "Index the whole post_reports table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			application, cleanup := service.NewApplication(ctx)

			defer cleanup()

			if err := application.Commands.DeleteAndRecreatePostReportsIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})
}
