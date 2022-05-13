package migrations

import (
	"embed"
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/libraries/database"
)

// Files contains *.cql schema migration files.
//go:embed cql/*.cql
var files embed.FS

func registerCallbacks() migrate.CallbackRegister {
	var reg = migrate.CallbackRegister{}
	return reg
}

var MigrateConfig = database.MigrateConfig{
	MigrationFiles:     files,
	Keyspace:           `CREATE KEYSPACE IF NOT EXISTS loader WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};`,
	MigrationCallbacks: registerCallbacks(),
}
