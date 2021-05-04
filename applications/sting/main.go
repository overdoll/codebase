package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/spf13/cobra"
	"overdoll/applications/sting/src/ports"
	"overdoll/applications/sting/src/service"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/commands/database"
)

var rootCmd = &cobra.Command{
	Use: "sting",
	Run: Run,
}

func init() {
	rootCmd.AddCommand(ports.Root)
	rootCmd.AddCommand(database.Database)
	rootCmd.AddCommand(&cobra.Command{
		Use: "jobs",
		Run: RunJobs,
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
	go RunJobs(cmd, args)
	RunHttp(cmd, args)
}

func RunJobs(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	_, router, cleanup := service.NewApplication(ctx)

	defer cleanup()

	if err := router.Run(ctx); err != nil {
		panic(err)
	}
}

func RunHttp(cmd *cobra.Command, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	app, _, cleanup := service.NewApplication(ctx)

	defer cleanup()

	srv := ports.NewGraphQLServer(app)

	bootstrap.InitializeHttpServer(srv, func() {})
}
