package ports

import (
	"context"
	"log"
	"time"

	"github.com/spf13/cobra"
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/service"
)

var Root = &cobra.Command{
	Use: "index",
}

func init() {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	application, _, cleanup := service.NewApplication(ctx)

	defer cleanup()

	Root.AddCommand(&cobra.Command{
		Use:   "artists",
		Short: "Index the whole artists table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			if err := application.Commands.Bus.CommandBus().Send(ctx, &sting.IndexAllArtists{}); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Root.AddCommand(&cobra.Command{
		Use:   "categories",
		Short: "Index the whole categories table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			if err := application.Commands.Bus.CommandBus().Send(ctx, &sting.IndexAllCategories{}); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Root.AddCommand(&cobra.Command{
		Use:   "characters",
		Short: "Index the whole characters table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			if err := application.Commands.Bus.CommandBus().Send(ctx, &sting.IndexAllCharacters{}); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})

	Root.AddCommand(&cobra.Command{
		Use:   "media",
		Short: "Index the whole media table into elasticsearch",
		Run: func(cmd *cobra.Command, args []string) {
			if err := application.Commands.Bus.CommandBus().Send(ctx, &sting.IndexAllMedia{}); err != nil {
				log.Fatalf(err.Error())
			}
		},
	})
}
