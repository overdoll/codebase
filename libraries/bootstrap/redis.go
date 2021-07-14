package bootstrap

import (
	"os"

	"github.com/go-redis/redis/v8"
	"github.com/spf13/viper"
)

func InitializeRedisSession() (*redis.Client, error) {
	return initializeRedisSession(viper.GetInt("redis.db"))
}

func initializeRedisSession(db int) (*redis.Client, error) {

	rdb := redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_HOST") + ":6379",
		Password: "", // no password set
		DB:       db, // use default DB
	})

	return rdb, nil
}

func InitializeRedisSessionWithCustomDB(db int) (*redis.Client, error) {
	return initializeRedisSession(db)
}
