package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/server"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/commands/database"
)

var rootCmd = &cobra.Command{
	Use: "eva",
	Run: Run,
}

func init() {
	rootCmd.AddCommand(database.Database)
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func Run(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	init, err := bootstrap.NewBootstrap(ctx)

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	session, err := init.InitializeDatabaseSession()

	if err != nil {
		log.Fatalf("database session failed with errors: %s", err)
	}

	s := server.CreateServer(session)

	init.InitializeGRPCServer(func(server *grpc.Server) {
		eva.RegisterEvaServer(server, s)
	})
}
