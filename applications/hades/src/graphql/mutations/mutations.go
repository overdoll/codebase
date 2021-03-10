package mutations

import (
	"github.com/gomodule/redigo/redis"
	"overdoll/applications/hades/src/services"
)

type MutationResolver struct {
	Services services.Services
	Redis    redis.Conn
}