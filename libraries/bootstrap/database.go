package bootstrap

import (
	"os"
	"overdoll/libraries/sentry_support"
	"strings"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

func initializeDatabaseSession(keyspace string) (gocqlx.Session, error) {

	// Create gocql cluster
	cluster := gocql.NewCluster(strings.Split(os.Getenv("DB_HOST"), ",")...)

	if keyspace != "" {
		cluster.Keyspace = keyspace
	}

	cluster.CQLVersion = "5.0.1"
	cluster.ReconnectInterval = 60 * time.Second
	cluster.Timeout = 20 * time.Second
	cluster.ConnectTimeout = 20 * time.Second
	cluster.ReconnectionPolicy = &gocql.ConstantReconnectionPolicy{MaxRetries: 30, Interval: 10 * time.Second}
	cluster.QueryObserver = &sentry_support.QueryObserver{}
	cluster.BatchObserver = &sentry_support.BatchObserver{}
	cluster.RetryPolicy = &gocql.ExponentialBackoffRetryPolicy{
		NumRetries: 5,
		Max:        time.Second * 7,
	}

	// Wrap session on creation with gocqlx
	session, err := gocqlx.WrapSession(cluster.CreateSession())

	if err != nil {
		return session, err
	}

	return session, nil
}

func InitializeDatabaseSession() gocqlx.Session {

	keyspace := viper.GetString("db.keyspace")

	session, err := initializeDatabaseSession(keyspace)

	if err != nil {
		zap.S().Fatalw("cassandra session failed", zap.Error(err))
	}

	return session
}

func InitializeDatabaseSessionNoKeyspace() gocqlx.Session {

	session, err := initializeDatabaseSession("")

	if err != nil {
		zap.S().Fatalw("cassandra session failed", zap.Error(err))
	}

	return session
}
