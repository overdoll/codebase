package commands

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/server/serve"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/events"
)

var rootCmd = &cobra.Command{
	Use: "sting",
}

var s = &cobra.Command{
	Use: "serve",
	Run: Run,
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	rootCmd.AddCommand(s)
}

func Run(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	init, err := bootstrap.NewBootstrap(ctx, "applications/sting")

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	session, err := init.InitializeDatabaseSession()

	if err != nil {
		log.Fatalf("database session failed with errors: %s", err)
	}

	eventsConn := events.GetConnection(ctx, "sting")

	s := serve.CreateServer(session, eventsConn)

	init.InitializeGRPCServer(func(server *grpc.Server) {
		sting.RegisterStingServer(server, s)
	})
}
