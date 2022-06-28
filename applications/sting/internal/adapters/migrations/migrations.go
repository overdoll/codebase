package migrations

import (
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/sting/internal/adapters/migrations/cql"
	"overdoll/libraries/database"
)

func registerCallbacks() migrate.CallbackRegister {
	return migrate.CallbackRegister{}
}

var MigrateConfig = database.MigrateConfig{
	MigrationFiles:     cql.Files,
	Keyspace:           `CREATE KEYSPACE IF NOT EXISTS sting WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};`,
	MigrationCallbacks: registerCallbacks(),
}
