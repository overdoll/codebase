package gen

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

import (
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/ports/graphql/entities"
	"overdoll/applications/eva/internal/ports/graphql/mutations"
	"overdoll/applications/eva/internal/ports/graphql/queries"
	"overdoll/applications/eva/internal/ports/graphql/resolvers"
)

type Resolver struct {
	app *app.Application
}

func NewResolver(app *app.Application) *Resolver {
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

// Query returns gen.QueryResolver implementation.
func (r *Resolver) Entity() EntityResolver {
	return &entities.EntityResolver{
		App: r.app,
	}
}

// Query returns gen.QueryResolver implementation.
func (r *Resolver) Account() AccountResolver {
	return &resolvers.AccountResolver{
		App: r.app,
	}
}

func (r *Resolver) AccountEmail() AccountEmailResolver {
	return &resolvers.AccountEmailResolver{
		App: r.app,
	}
}
