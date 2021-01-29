package resolvers

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

import (
	"github.com/gomodule/redigo/redis"
	"overdoll/applications/hades/src/services"
	"overdoll/libraries/rabbit"
)

type Resolver struct {
	services services.Services
	redis    redis.Conn
	rabbit   rabbit.Conn
}

func NewResolver(s services.Services, redis redis.Conn, rabbitSvc rabbit.Conn) *Resolver {
	return &Resolver{services: s, redis: redis, rabbit: rabbitSvc}
}
