package ports

import (
	"context"
	"log"
	"time"

	"github.com/spf13/cobra"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/service"
)

type CLI struct {
	app app.Application
}

var Root = &cobra.Command{
	Use: "index",
}

func init() {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	application, cleanup := service.NewApplication(ctx)

	defer cleanup()

	Root.AddCommand(&cobra.Command{
		Use:   "artists",
		Short: "Index the whole artists table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			if err := application.Commands.IndexArtists.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Root.AddCommand(&cobra.Command{
		Use:   "categories",
		Short: "Index the whole categories table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			if err := application.Commands.IndexCategories.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Root.AddCommand(&cobra.Command{
		Use:   "characters",
		Short: "Index the whole characters table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			if err := application.Commands.IndexCharacters.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Root.AddCommand(&cobra.Command{
		Use:   "media",
		Short: "Index the whole media table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			if err := application.Commands.IndexMedia.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})
}
