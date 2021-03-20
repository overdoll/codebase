package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/commands"
	"overdoll/applications/sting/src/server"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/commands/database"
	"overdoll/libraries/events"
)

var rootCmd = &cobra.Command{
	Use: "sting",
	Run: Run,
}

func init() {
	rootCmd.AddCommand(commands.Root)
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

	eventsConn := events.GetConnection(ctx, "sting")

	s := server.CreateServer(session, eventsConn)

	init.InitializeGRPCServer(func(server *grpc.Server) {
		sting.RegisterStingServer(server, s)
	})
}
