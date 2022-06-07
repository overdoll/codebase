package bootstrap

import (
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"

	"github.com/go-redis/redis/v8"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

func InitializeRedisSession() *redis.Client {

	client, err := initializeRedisSession(viper.GetInt("redis.db"))

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "redis session failed"))
		zap.S().Fatalw("redis session failed", zap.Error(err))
	}

	return client
}

func initializeRedisSession(db int) (*redis.Client, error) {

	rdb := redis.NewClient(&redis.Options{
		Addr: os.Getenv("REDIS_HOST") + ":6379",
		DB:   db,
	})

	return rdb, nil
}
