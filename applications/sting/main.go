package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/spf13/cobra"
	"overdoll/applications/sting/src/ports"
	"overdoll/applications/sting/src/service"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/commands"
	"overdoll/libraries/config"
)

var rootCmd = &cobra.Command{
	Use: "sting",
	Run: Run,
}

func init() {
	config.Read()

	rootCmd.AddCommand(ports.Root)
	rootCmd.AddCommand(commands.Database)
	rootCmd.AddCommand(&cobra.Command{
		Use: "worker",
		Run: RunWorker,
	})
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
	go RunWorker(cmd, args)
	RunHttp(cmd, args)
}

func RunWorker(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, _ := service.NewApplication(ctx)

	srv := ports.NewWorker(&app)

	bootstrap.InitializeWorkerServer(srv)
}

func RunHttp(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	srv := ports.NewGraphQLServer(&app)

	bootstrap.InitializeHttpServer(srv, func() {})
}
