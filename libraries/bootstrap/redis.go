package bootstrap

import (
	"os"

	"github.com/go-redis/redis/v8"
)

func InitializeRedisSession(db int) (*redis.Client, error) {

	rdb := redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_HOST") + ":6379",
		Password: "", // no password set
		DB:       db, // use default DB
	})

	return rdb, nil
}
