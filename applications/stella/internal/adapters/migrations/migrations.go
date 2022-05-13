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

	reg.Add(migrate.CallComment, "create_clubs_index", createClubsIndex)
	reg.Add(migrate.CallComment, "create_club_members_index", createClubMembersIndex)

	return reg
}

var MigrateConfig = database.MigrateConfig{
	MigrationFiles:     files,
	Keyspace:           `CREATE KEYSPACE IF NOT EXISTS stella WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};`,
	MigrationCallbacks: registerCallbacks(),
}
