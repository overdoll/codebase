package main

import (
	"context"
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"overdoll/applications/buffer/src/ports"
	"overdoll/applications/buffer/src/service"
	"overdoll/libraries/bootstrap"
)

var rootCmd = &cobra.Command{
	Use: "buffer",
	Run: Run,
}

func init() {
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func Run(cmd *cobra.Command, args []string) {
	ctx := context.Background()

	app, cleanup := service.NewApplication(ctx)

	srv := ports.NewHttpServer(app)

	bootstrap.InitializeMuxHttpServerOnAddress(":8000", srv, func() {
		cleanup()
	})
}
