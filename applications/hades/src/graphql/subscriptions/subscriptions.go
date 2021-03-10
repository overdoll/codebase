package subscriptions

import (
	"overdoll/applications/hades/src/services"
	"overdoll/libraries/rabbit"
)

type SubscriptionResolver struct {
	Services services.Services
	Rabbit   rabbit.Conn
}