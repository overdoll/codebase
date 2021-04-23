package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/spf13/cobra"
	"overdoll/applications/sting/src/ports"
	"overdoll/applications/sting/src/service"
	"overdoll/libraries/commands/database"
)

var rootCmd = &cobra.Command{
	Use: "sting",
	Run: Run,
}

func init() {
	rootCmd.AddCommand(ports.Root)
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

	app, cleanup := service.NewApplication(ctx)

	defer cleanup()

	// TODO: start it (jobs)
}
