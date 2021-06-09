package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/spf13/cobra"
	"overdoll/applications/parley/src/ports"
	"overdoll/applications/parley/src/service"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/commands"
	"overdoll/libraries/config"
)

var rootCmd = &cobra.Command{
	Use: "parley",
	Run: Run,
}

func init() {
	config.Read("applications/parley/config.toml")

	rootCmd.AddCommand(commands.Database)
	rootCmd.AddCommand(&cobra.Command{
		Use: "http",
		Run: RunHttp,
	})
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func Run(cmd *cobra.Command, args []string) {
	RunHttp(cmd, args)
}

func RunHttp(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	srv := ports.NewGraphQLServer(&app)

	bootstrap.InitializeHttpServer(":8000", srv, func() {})
}
