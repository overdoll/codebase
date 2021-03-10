package queries

import (
	"github.com/gomodule/redigo/redis"
	"overdoll/applications/hades/src/services"
	"overdoll/libraries/rabbit"
	"overdoll/libraries/search"
)

type QueryResolver struct {
	Services services.Services
	Redis    redis.Conn
	Rabbit   rabbit.Conn
	Search   search.Store
}