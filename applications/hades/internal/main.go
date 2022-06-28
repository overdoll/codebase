package main

import (
	"context"
	"google.golang.org/grpc"
	"os"
	"overdoll/applications/hades/internal/adapters/indexes"
	"overdoll/applications/hades/internal/adapters/migrations"
	"overdoll/applications/hades/internal/adapters/seeders"
	"overdoll/applications/hades/internal/ports"
	"overdoll/applications/hades/internal/service"
	hades "overdoll/applications/hades/proto"
	"overdoll/libraries/cache"
	"overdoll/libraries/database"
	"time"

	"github.com/spf13/cobra"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/config"
)

var rootCmd = &cobra.Command{
	Use: "hades",
	Run: Run,
}

func init() {
	config.Read("applications/hades")

	rootCmd.AddCommand(
		database.CreateDatabaseCommands(
			migrations.MigrateConfig,
			seeders.SeederConfig,
		),
	)
	rootCmd.AddCommand(cache.CreateCacheCommands(indexes.IndexConfig))

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
		os.Exit(1)
	}
}

func Run(cmd *cobra.Command, args []string) {
	go RunWorker(cmd, args)
	go RunGrpc(cmd, args)
	RunHttp(cmd, args)
}

func RunWorker(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, _ := service.NewApplication(ctx)

	srv, cleanup := ports.NewWorker(app)

	defer cleanup()

	bootstrap.InitializeWorkerServer(srv)
}

func RunGrpc(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	s := ports.NewGrpcServer(app)

	bootstrap.InitializeGRPCServer("0.0.0.0:8080", func(server *grpc.Server) {
		hades.RegisterHadesServer(server, s)
	})
}

func RunHttp(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	srv := ports.NewHttpServer(app)

	bootstrap.InitializeHttpServer("0.0.0.0:8000", srv, func() {})
}
