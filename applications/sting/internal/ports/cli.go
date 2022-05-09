package ports

import (
	"context"
	"log"
	"time"

	"github.com/spf13/cobra"
	"overdoll/applications/sting/internal/service"
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

			if err := application.Commands.DeleteAndRecreateCategoriesIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}

			if err := application.Commands.DeleteAndRecreateCharactersIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}

			if err := application.Commands.DeleteAndRecreateSeriesIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}

			if err := application.Commands.DeleteAndRecreateAudienceIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}

			if err := application.Commands.DeleteAndRecreatePostsIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Cli.AddCommand(&cobra.Command{
		Use:   "categories",
		Short: "Index the whole categories table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			application, cleanup := service.NewApplication(ctx)

			defer cleanup()

			if err := application.Commands.DeleteAndRecreateCategoriesIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Cli.AddCommand(&cobra.Command{
		Use:   "characters",
		Short: "Index the whole characters table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			application, cleanup := service.NewApplication(ctx)

			defer cleanup()

			if err := application.Commands.DeleteAndRecreateCharactersIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Cli.AddCommand(&cobra.Command{
		Use:   "series",
		Short: "Index the whole series table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			application, cleanup := service.NewApplication(ctx)

			defer cleanup()

			if err := application.Commands.DeleteAndRecreateSeriesIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Cli.AddCommand(&cobra.Command{
		Use:   "audience",
		Short: "Index the whole brands table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			application, cleanup := service.NewApplication(ctx)

			defer cleanup()

			if err := application.Commands.DeleteAndRecreateAudienceIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Cli.AddCommand(&cobra.Command{
		Use:   "posts",
		Short: "Index the whole posts table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			application, cleanup := service.NewApplication(ctx)

			defer cleanup()

			if err := application.Commands.DeleteAndRecreatePostsIndex.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})
}
