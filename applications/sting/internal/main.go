package main

import (
	"context"
	"os"
	"overdoll/applications/sting/internal/adapters/indexes"
	"overdoll/applications/sting/internal/adapters/migrations"
	"overdoll/applications/sting/internal/adapters/seeders"
	"overdoll/libraries/cache"
	resource_proto "overdoll/libraries/resource/proto"
	"time"

	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	"overdoll/applications/sting/internal/ports"
	"overdoll/applications/sting/internal/service"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/config"
	"overdoll/libraries/database"
)

var rootCmd = &cobra.Command{
	Use: "sting",
	Run: Run,
}

func init() {
	config.Read("applications/sting")

	rootCmd.AddCommand(database.CreateDatabaseCommands(migrations.MigrateConfig, seeders.SeederConfig))
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
	go RunHttp(cmd, args)
	go RunWorker(cmd, args)
	RunGrpc(cmd, args)
}

func RunWorker(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, _ := service.NewApplication(ctx)

	srv, cleanup := ports.NewWorker(app)

	defer cleanup()

	bootstrap.InitializeWorkerServer(srv)
}

func RunHttp(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	srv := ports.NewHttpServer(app)

	bootstrap.InitializeHttpServer("0.0.0.0:8000", srv, func() {})
}

func RunGrpc(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	s := ports.NewGrpcServer(app)

	bootstrap.InitializeGRPCServer("0.0.0.0:8080", func(server *grpc.Server) {
		sting.RegisterStingServer(server, s)
		resource_proto.RegisterResourceCallbackServer(server, s)
	})
}
