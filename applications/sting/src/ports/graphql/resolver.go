package gen

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

import (
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/mutations"
	"overdoll/applications/sting/src/ports/graphql/queries"
)

type Resolver struct {
	app app.Application
}

func NewResolver(app app.Application) *Resolver {
	return &Resolver{app: app}
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
