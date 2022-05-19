package database

import (
	"github.com/spf13/cobra"
)

func CreateDatabaseCommands(migrateConfig MigrateConfig, seederConfig SeederConfig) *cobra.Command {
	database := &cobra.Command{
		Use: "db",
	}

	database.AddCommand(createMigrate(migrateConfig))
	database.AddCommand(createSeed(seederConfig))

	return database
}
