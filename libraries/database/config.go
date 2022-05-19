package database

import (
	"context"
	"embed"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
)

type MigrateConfig struct {
	Keyspace           string
	MigrationFiles     embed.FS
	MigrationCallbacks migrate.CallbackRegister
}

type SeederConfig struct {
	SeederFiles     embed.FS
	SeederCallbacks func(ctx context.Context, session gocqlx.Session) error
}
