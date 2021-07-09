package bootstrap

import (
	"os"

	"github.com/go-redis/redis/v8"
	"github.com/spf13/viper"
)

func InitializeRedisSession() (*redis.Client, error) {

	rdb := redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_HOST") + ":6379",
		Password: "",                       // no password set
		DB:       viper.GetInt("redis.db"), // use default DB
	})

	return rdb, nil
}
