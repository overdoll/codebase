package migrations

import (
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/hades/internal/adapters/migrations/cql"
	"overdoll/libraries/database"
)

func registerCallbacks() migrate.CallbackRegister {
	var reg = migrate.CallbackRegister{}

	reg.Add(migrate.CallComment, "create_account_club_supporter_subscriptions_index", createAccountClubSupporterSubscriptionsIndex)
	reg.Add(migrate.CallComment, "create_account_transactions_index", createAccountTransactionsIndex)

	return reg
}

var MigrateConfig = database.MigrateConfig{
	MigrationFiles:     cql.Files,
	Keyspace:           `CREATE KEYSPACE IF NOT EXISTS hades WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};`,
	MigrationCallbacks: registerCallbacks(),
}
