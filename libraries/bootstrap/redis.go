package bootstrap

import (
	"os"

	"github.com/go-redis/redis/v8"
	"github.com/spf13/viper"
	"go.uber.org/zap"
)

func InitializeRedisSession() *redis.Client {

	client, err := initializeRedisSession(viper.GetInt("redis.db"))

	if err != nil {
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

func InitializeRedisSessionWithCustomDB(db int) *redis.Client {

	client, err := initializeRedisSession(db)

	if err != nil {
		zap.S().Fatalw("redis session failed", zap.Error(err))
	}

	return client
}
