package migrations

import (
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/libraries/database"
)

import "embed"

// Files contains *.cql schema migration files.
//go:embed cql/*.cql
var files embed.FS

func registerCallbacks() migrate.CallbackRegister {
	var reg = migrate.CallbackRegister{}
	return reg
}

var MigrateConfig = database.MigrateConfig{
	MigrationFiles:     files,
	Keyspace:           `CREATE KEYSPACE IF NOT EXISTS eva WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};`,
	MigrationCallbacks: registerCallbacks(),
}
