package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/ports"
	"overdoll/applications/eva/src/service"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/commands/database"
)

var rootCmd = &cobra.Command{
	Use: "eva",
	Run: Run,
}

func init() {
	rootCmd.AddCommand(database.Database)
	rootCmd.AddCommand(&cobra.Command{
		Use: "grpc",
		Run: RunGrpc,
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
	go RunGrpc(cmd, args)
	RunHttp(cmd, args)
}

func RunGrpc(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	s := ports.CreateServer(app)

	bootstrap.InitializeGRPCServer(func(server *grpc.Server) {
		eva.RegisterEvaServer(server, s)
	})
}

func RunHttp(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	srv := ports.NewGraphQLServer(app)

	bootstrap.InitializeHttpServer(srv, func() {})
}
