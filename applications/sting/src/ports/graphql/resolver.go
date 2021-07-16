package gen

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

import (
	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/entities"
	"overdoll/applications/sting/src/ports/graphql/mutations"
	"overdoll/applications/sting/src/ports/graphql/queries"
	"overdoll/applications/sting/src/ports/graphql/resolvers"
)

type Resolver struct {
	app    *app.Application
	client client.Client
}

func NewResolver(app *app.Application, client client.Client) *Resolver {
	return &Resolver{app: app, client: client}
}

// Mutation returns gen.MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver {
	return &mutations.MutationResolver{
		App:    r.app,
		Client: r.client,
	}
}

// Query returns gen.QueryResolver implementation.
func (r *Resolver) Query() QueryResolver {
	return &queries.QueryResolver{
		App: r.app,
	}
}

// Query returns gen.QueryResolver implementation.
func (r *Resolver) Entity() EntityResolver {
	return &entities.EntityResolver{
		App: r.app,
	}
}

func (r *Resolver) Account() AccountResolver {
	return &resolvers.AccountResolver{
		App: r.app,
	}
}
