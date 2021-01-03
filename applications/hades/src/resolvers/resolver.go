package resolvers

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

import (
	"github.com/gomodule/redigo/redis"
	"project01101000/codebase/applications/hades/src/services"
)

type Resolver struct {
	services services.Services
	redis    redis.Conn
	redisPB redis.PubSubConn
}

func NewResolver(s services.Services, redis redis.Conn, redisPub redis.PubSubConn) *Resolver {
	return &Resolver{services: s, redis: redis, redisPB: redisPub}
}
