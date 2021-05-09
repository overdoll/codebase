package commands

import (
	"github.com/spf13/cobra"
)

var Database = &cobra.Command{
	Use: "db",
}

func init() {
	Database.AddCommand(Migrate)
	Database.AddCommand(Seed)
}