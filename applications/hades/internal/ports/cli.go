package ports

import (
	"context"
	"log"
	"overdoll/applications/hades/internal/service"
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

			if err := application.Commands.DeleteAndRecreateAccountTransactionsIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}

			if err := application.Commands.DeleteAndRecreateAccountClubSupporterSubscriptionsIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Cli.AddCommand(&cobra.Command{
		Use:   "account-transactions",
		Short: "Index the whole account_transactions table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			application, cleanup := service.NewApplication(ctx)

			defer cleanup()

			if err := application.Commands.DeleteAndRecreateAccountTransactionsIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Cli.AddCommand(&cobra.Command{
		Use:   "account-club-supporter-subscriptions",
		Short: "Index the whole account_club_supporter_subscriptions table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			application, cleanup := service.NewApplication(ctx)

			defer cleanup()

			if err := application.Commands.DeleteAndRecreateAccountClubSupporterSubscriptionsIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})
}
