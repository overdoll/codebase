package migrations

import (
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/ringer/internal/adapters/migrations/cql"
	"overdoll/libraries/database"
)

func registerCallbacks() migrate.CallbackRegister {
	var reg = migrate.CallbackRegister{}

	reg.Add(migrate.CallComment, "create_club_payouts_index", createClubPayoutsIndex)
	reg.Add(migrate.CallComment, "create_club_payments_index", createClubPaymentsIndex)

	return reg
}

var MigrateConfig = database.MigrateConfig{
	MigrationFiles:     cql.Files,
	Keyspace:           `CREATE KEYSPACE IF NOT EXISTS ringer WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};`,
	MigrationCallbacks: registerCallbacks(),
}
