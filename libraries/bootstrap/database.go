package bootstrap

import (
	"os"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
)

func InitializeDatabaseSession(keyspace string) (gocqlx.Session, error) {

	// Create gocql cluster
	cluster := gocql.NewCluster(os.Getenv("DB_HOST"))

	if keyspace != "" {
		cluster.Keyspace = keyspace
	}

	// Wrap session on creation with gocqlx
	session, err := gocqlx.WrapSession(cluster.CreateSession())

	if err != nil {
		return session, err
	}

	return session, nil
}
