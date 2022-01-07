package main

import (
	"context"
	"fmt"
	"os"
	"overdoll/applications/loader/internal/ports"
	"overdoll/applications/loader/internal/service"
	loader "overdoll/applications/loader/proto"
	"time"

	"github.com/spf13/cobra"
	"google.golang.org/grpc"

	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/commands"
	"overdoll/libraries/config"
)

var rootCmd = &cobra.Command{
	Use: "loader",
	Run: Run,
}

func init() {
	config.Read("applications/loader")

	rootCmd.AddCommand(commands.Database)
	rootCmd.AddCommand(&cobra.Command{
		Use: "worker",
		Run: RunWorker,
	})
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

	if os.Getenv("DISABLE_WORKER") == "" {
		go RunWorker(cmd, args)
	}

	RunGrpc(cmd, args)
}

func RunWorker(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, _ := service.NewApplication(ctx)

	srv, cleanup := ports.NewWorker(&app)

	defer cleanup()

	bootstrap.InitializeWorkerServer(srv)
}

func RunHttp(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	client := clients.NewTemporalClient(ctx)

	defer client.Close()

	srv := ports.NewHttpServer(&app, client)

	bootstrap.InitializeHttpServer(":8000", srv, func() {})
}

func RunGrpc(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	client := clients.NewTemporalClient(ctx)

	defer client.Close()

	s := ports.NewGrpcServer(&app, client)

	bootstrap.InitializeGRPCServer("0.0.0.0:8080", func(server *grpc.Server) {
		loader.RegisterLoaderServer(server, s)
	})
}
