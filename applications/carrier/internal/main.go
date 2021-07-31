package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	"overdoll/applications/carrier/internal/ports"
	"overdoll/applications/carrier/internal/service"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/config"
)

var rootCmd = &cobra.Command{
	Use: "carrier",
	Run: Run,
}

func init() {
	config.Read("applications/carrier")
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
	RunGrpc(cmd, args)
}

func RunGrpc(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	s := ports.NewGrpcServer(&app)

	bootstrap.InitializeGRPCServer("0.0.0.0:8080", func(server *grpc.Server) {
		carrier.RegisterCarrierServer(server, s)
	})
}
