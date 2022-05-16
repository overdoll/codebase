package main

import (
	"context"
	_ "embed"
	"fmt"
	"os"
	"overdoll/applications/eva/internal/adapters/migrations"
	"overdoll/applications/eva/internal/adapters/seeders"
	"time"

	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	"overdoll/applications/eva/internal/ports"
	"overdoll/applications/eva/internal/service"
	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/config"
	"overdoll/libraries/database"
)

var rootCmd = &cobra.Command{
	Use: "eva",
	Run: Run,
}

func init() {
	config.Read("applications/eva")

	rootCmd.AddCommand(database.CreateDatabaseCommands(migrations.MigrateConfig, seeders.SeederConfig))
	rootCmd.AddCommand(&cobra.Command{
		Use: "grpc",
		Run: RunGrpc,
	})
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
	go RunGrpc(cmd, args)
	RunHttp(cmd, args)
}

func RunGrpc(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	s := ports.NewGrpcServer(&app)

	bootstrap.InitializeGRPCServer("0.0.0.0:8080", func(server *grpc.Server) {
		eva.RegisterEvaServer(server, s)
	})
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

	srv := ports.NewHttpServer(&app)

	bootstrap.InitializeHttpServer(":8000", srv, func() {})
}
