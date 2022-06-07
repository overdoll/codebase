package bootstrap

import (
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
	"overdoll/libraries/support"
	"overdoll/libraries/zap_support/zap_adapters"
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

	username := os.Getenv("DB_USERNAME")
	password := os.Getenv("DB_PASSWORD")

	if username != "" && password != "" {
		cluster.Authenticator = gocql.PasswordAuthenticator{
			Username: username,
			Password: password,
		}
	}

	cluster.CQLVersion = "5.0.1"
	cluster.ReconnectInterval = 60 * time.Second
	cluster.Timeout = 20 * time.Second
	cluster.ConnectTimeout = 20 * time.Second
	cluster.ReconnectionPolicy = &gocql.ConstantReconnectionPolicy{MaxRetries: 30, Interval: 10 * time.Second}
	cluster.QueryObserver = &sentry_support.QueryObserver{}
	cluster.BatchObserver = &sentry_support.BatchObserver{}

	// the retry policy can make tests buggy (workflows timeout if retries occur), so we only enable them in non-test mode
	if !support.IsTest() {
		cluster.RetryPolicy = &gocql.ExponentialBackoffRetryPolicy{
			Min:        time.Second,
			Max:        7 * time.Second,
			NumRetries: 5,
		}
	}

	cluster.Logger = zap_adapters.NewGocqlZapAdapter(zap.S())
	cluster.Dialer = &gocql.ScyllaShardAwareDialer{}
	cluster.PoolConfig.HostSelectionPolicy = gocql.TokenAwareHostPolicy(gocql.RoundRobinHostPolicy())

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
		sentry_support.MustCaptureException(errors.Wrap(err, "cassandra session failed"))
		zap.S().Fatalw("cassandra session failed", zap.Error(err))
	}

	return session
}

func InitializeDatabaseSessionNoKeyspace() gocqlx.Session {

	session, err := initializeDatabaseSession("")

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "cassandra session failed"))
		zap.S().Fatalw("cassandra session failed", zap.Error(err))
	}

	return session
}
