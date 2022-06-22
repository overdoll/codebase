package migrations

import (
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/sting/internal/adapters/migrations/cql"
	"overdoll/libraries/database"
)

func registerCallbacks() migrate.CallbackRegister {
	var reg = migrate.CallbackRegister{}

	reg.Add(migrate.CallComment, "create_categories_index", createCategoryIndex)
	reg.Add(migrate.CallComment, "create_audience_index", createAudienceIndex)
	reg.Add(migrate.CallComment, "create_characters_index", createCharacterIndex)
	reg.Add(migrate.CallComment, "create_series_index", createSeriesIndex)
	reg.Add(migrate.CallComment, "create_posts_index", createPostsIndex)
	reg.Add(migrate.CallComment, "create_clubs_index", createClubsIndex)
	reg.Add(migrate.CallComment, "create_club_members_index", createClubMembersIndex)
	reg.Add(migrate.CallComment, "add_clubs_banner_disable_supporter_only_posts_index", addClubsBannerToIndex)

	return reg
}

var MigrateConfig = database.MigrateConfig{
	MigrationFiles:     cql.Files,
	Keyspace:           `CREATE KEYSPACE IF NOT EXISTS sting WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};`,
	MigrationCallbacks: registerCallbacks(),
}
