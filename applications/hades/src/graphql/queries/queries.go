package queries

import (
	"github.com/gomodule/redigo/redis"
	"overdoll/applications/hades/src/services"
	"overdoll/libraries/rabbit"
)

type QueryResolver struct {
	Services services.Services
	Redis    redis.Conn
	Rabbit   rabbit.Conn
}