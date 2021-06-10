package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	parley "overdoll/applications/parley/proto"
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
	rootCmd.AddCommand(&cobra.Command{
		Use: "grpc",
		Run: RunGrpc,
	})
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func Run(cmd *cobra.Command, args []string) {
	go RunHttp(cmd, args)
	RunGrpc(cmd, args)
}

func RunHttp(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	srv := ports.NewGraphQLServer(&app)

	bootstrap.InitializeHttpServer(":8000", srv, func() {})
}

func RunGrpc(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	s := ports.NewGrpcServer(&app)

	bootstrap.InitializeGRPCServer("0.0.0.0:8080", func(server *grpc.Server) {
		parley.RegisterParleyServer(server, s)
	})
}
