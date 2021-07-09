package bootstrap

import (
	"os"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/spf13/viper"
)

func initializeDatabaseSession(keyspace string) (gocqlx.Session, error) {

	// Create gocql cluster
	cluster := gocql.NewCluster(os.Getenv("DB_HOST"))

	if keyspace != "" {
		cluster.Keyspace = keyspace
	}

	cluster.ReconnectInterval = 60 * time.Second
	cluster.Timeout = 20 * time.Second
	cluster.ConnectTimeout = 20 * time.Second
	cluster.ReconnectionPolicy = &gocql.ConstantReconnectionPolicy{MaxRetries: 10, Interval: 5 * time.Second}

	// Wrap session on creation with gocqlx
	session, err := gocqlx.WrapSession(cluster.CreateSession())

	if err != nil {
		return session, err
	}

	return session, nil
}

func InitializeDatabaseSession() (gocqlx.Session, error) {

	keyspace := viper.GetString("db.keyspace")

	return initializeDatabaseSession(keyspace)
}

func InitializeDatabaseSessionNoKeyspace() (gocqlx.Session, error) {

	return initializeDatabaseSession("")
}
