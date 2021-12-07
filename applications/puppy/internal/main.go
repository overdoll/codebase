package main

import (
	"context"
	"fmt"
	"github.com/spf13/cobra"
	"os"
	"overdoll/applications/puppy/internal/ports"
	"overdoll/applications/puppy/internal/service"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/commands"
	"overdoll/libraries/config"
	"time"
)

var rootCmd = &cobra.Command{
	Use: "puppy",
	Run: Run,
}

func init() {
	config.Read("applications/puppy")

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

	srv := ports.NewHttpServer(ctx, app)

	bootstrap.InitializeHttpServer(":8000", srv, func() {})
}
