package main

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	"os"
	"overdoll/applications/hades/internal/ports"
	"overdoll/applications/hades/internal/service"
	hades "overdoll/applications/hades/proto"
	"time"

	"github.com/spf13/cobra"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/commands"
	"overdoll/libraries/config"
)

var rootCmd = &cobra.Command{
	Use: "hades",
	Run: Run,
}

func init() {
	config.Read("applications/hades")

	rootCmd.AddCommand(ports.Cli)
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

	if os.Getenv("DISABLE_WORKER") == "" {
		go RunWorker(cmd, args)
	}

	go RunGrpc(cmd, args)
	RunHttp(cmd, args)
}

func RunWorker(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, _ := service.NewApplication(ctx)

	srv, cleanup := ports.NewWorker(&app)

	defer cleanup()

	bootstrap.InitializeWorkerServer(srv)
}

func RunGrpc(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	s := ports.NewGrpcServer(&app)

	bootstrap.InitializeGRPCServer("0.0.0.0:8080", func(server *grpc.Server) {
		hades.RegisterHadesServer(server, s)
	})
}

func RunHttp(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	srv := ports.NewHttpServer(&app)

	bootstrap.InitializeHttpServer(":8000", srv, func() {})
}
