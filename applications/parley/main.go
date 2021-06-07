package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"overdoll/libraries/commands"
	"overdoll/libraries/config"
)

var rootCmd = &cobra.Command{
	Use: "parley",
	Run: Run,
}

func init() {
	config.Read("applications/parley/config.toml")

	rootCmd.AddCommand(commands.Database)
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func Run(cmd *cobra.Command, args []string) {

}
