package subscriptions

import (
	"github.com/gomodule/redigo/redis"
	"overdoll/applications/hades/src/services"
	"overdoll/libraries/rabbit"
)

type SubscriptionResolver struct {
	Services services.Services
	Redis    redis.Conn
	Rabbit   rabbit.Conn
}