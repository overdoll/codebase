package gen

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

import (
	"overdoll/applications/hades/src/app"
	"overdoll/applications/hades/src/ports/graphql/directives"
	"overdoll/applications/hades/src/ports/graphql/mutations"
	"overdoll/applications/hades/src/ports/graphql/queries"
	"overdoll/applications/hades/src/ports/graphql/subscriptions"
)

type Resolver struct {
	app app.Application
}

func NewResolver(app app.Application) *Resolver {
	return &Resolver{app: app}
}

// Subscription returns gen.SubscriptionResolver implementation.
func (r *Resolver) Subscription() SubscriptionResolver {
	return &subscriptions.SubscriptionResolver{
		App: r.app,
	}
}

// Mutation returns gen.MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver {
	return &mutations.MutationResolver{
		App: r.app,
	}
}

// Query returns gen.QueryResolver implementation.
func (r *Resolver) Query() QueryResolver {
	return &queries.QueryResolver{
		App: r.app,
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
