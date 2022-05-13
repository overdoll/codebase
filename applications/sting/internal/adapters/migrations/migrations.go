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

	reg.Add(migrate.CallComment, "create_categories_index", createCategoryIndex)
	reg.Add(migrate.CallComment, "create_audience_index", createAudienceIndex)
	reg.Add(migrate.CallComment, "create_characters_index", createCharacterIndex)
	reg.Add(migrate.CallComment, "create_series_index", createSeriesIndex)
	reg.Add(migrate.CallComment, "create_posts_index", createPostsIndex)

	return reg
}

var MigrateConfig = database.MigrateConfig{
	MigrationFiles:     files,
	Keyspace:           `CREATE KEYSPACE IF NOT EXISTS sting WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};`,
	MigrationCallbacks: registerCallbacks(),
}
