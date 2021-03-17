package gen

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

import (
	"github.com/gomodule/redigo/redis"
	"overdoll/applications/hades/src/graphql/directives"
	"overdoll/applications/hades/src/graphql/mutations"
	"overdoll/applications/hades/src/graphql/queries"
	"overdoll/applications/hades/src/graphql/subscriptions"
	"overdoll/applications/hades/src/services"
	"overdoll/libraries/rabbit"
	"overdoll/libraries/search"
)

type Resolver struct {
	services services.Services
	redis    redis.Conn
	rabbit   rabbit.Conn
	search   *search.Store
}

func NewResolver(s services.Services, redis redis.Conn, rabbitSvc rabbit.Conn, store *search.Store) *Resolver {
	return &Resolver{services: s, redis: redis, rabbit: rabbitSvc, search: store}
}

// Subscription returns gen.SubscriptionResolver implementation.
func (r *Resolver) Subscription() SubscriptionResolver {
	return &subscriptions.SubscriptionResolver{
		Services: r.services,
		Rabbit:   r.rabbit,
	}
}

// Mutation returns gen.MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver {
	return &mutations.MutationResolver{
		Services: r.services,
		Redis:    r.redis,
	}
}

// Query returns gen.QueryResolver implementation.
func (r *Resolver) Query() QueryResolver {
	return &queries.QueryResolver{
		Services: r.services,
		Redis:    r.redis,
		Rabbit:   r.rabbit,
		Search:   r.search,
	}
}

// Directive returns gen.DirectiveRoot
func Directive() DirectiveRoot {

	resolver := directives.DirectiveResolver{}

	return DirectiveRoot{
		Auth:       resolver.Auth,
		Guest:      resolver.Guest,
		Role:       resolver.Role,
		Verified:   resolver.Verified,
		Validation: resolver.Validation,
	}
}
