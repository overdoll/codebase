package tests

import (
	"os"
	"testing"

	"github.com/gomodule/redigo/redis"
)

// Init - Create a redis session for testing
func Init(t *testing.T) redis.Conn {

	// Redis
	redisSvc, err := redis.Dial("tcp", os.Getenv("REDIS_URL"), redis.DialDatabase(1))

	if err != nil {
		t.Fatal("failed to connect to redis: ", err)
	}

	return redisSvc
}
