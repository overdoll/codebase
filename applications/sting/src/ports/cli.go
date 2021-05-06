package ports

import (
	"context"
	"log"
	"time"

	"github.com/spf13/cobra"
	"overdoll/applications/sting/src/service"
)

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
			if err := application.Commands.IndexAllArtists.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Root.AddCommand(&cobra.Command{
		Use:   "categories",
		Short: "Index the whole categories table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			if err := application.Commands.IndexAllCategories.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Root.AddCommand(&cobra.Command{
		Use:   "characters",
		Short: "Index the whole characters table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			if err := application.Commands.IndexAllCharacters.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Root.AddCommand(&cobra.Command{
		Use:   "media",
		Short: "Index the whole media table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			if err := application.Commands.IndexAllMedia.Handle(ctx); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})
}
