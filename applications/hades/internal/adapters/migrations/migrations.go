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

	reg.Add(migrate.CallComment, "create_account_club_supporter_subscriptions_index", createAccountClubSupporterSubscriptionsIndex)
	reg.Add(migrate.CallComment, "create_account_transactions_index", createAccountTransactionsIndex)

	return reg
}

var MigrateConfig = database.MigrateConfig{
	MigrationFiles:     files,
	Keyspace:           `CREATE KEYSPACE IF NOT EXISTS hades WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};`,
	MigrationCallbacks: registerCallbacks(),
}
