package main

import (
	"context"
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"overdoll/applications/buffer/src/ports"
	"overdoll/applications/buffer/src/service"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/config"
)

var rootCmd = &cobra.Command{
	Use: "buffer",
	Run: Run,
}

func init() {
	config.Read("applications/buffer/config.toml")
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

	bootstrap.InitializeHttpServer(":8000", srv, func() {
		cleanup()
	})
}
