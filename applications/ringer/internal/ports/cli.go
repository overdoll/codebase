package ports

import (
	"context"
	"log"
	"overdoll/applications/ringer/internal/service"
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

			if err := application.Commands.DeleteAndRecreateClubPaymentsIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}

			if err := application.Commands.DeleteAndRecreateClubPayoutsIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Cli.AddCommand(&cobra.Command{
		Use:   "club-payments",
		Short: "Index the whole club_payments table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			application, cleanup := service.NewApplication(ctx)

			defer cleanup()

			if err := application.Commands.DeleteAndRecreateClubPaymentsIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Cli.AddCommand(&cobra.Command{
		Use:   "club-payouts",
		Short: "Index the whole club_payouts table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			application, cleanup := service.NewApplication(ctx)

			defer cleanup()

			if err := application.Commands.DeleteAndRecreateClubPayoutsIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})
}
