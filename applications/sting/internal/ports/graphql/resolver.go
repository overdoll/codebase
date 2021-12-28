package gen

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

import (
	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/ports/graphql/entities"
	"overdoll/applications/sting/internal/ports/graphql/mutations"
	"overdoll/applications/sting/internal/ports/graphql/queries"
	"overdoll/applications/sting/internal/ports/graphql/resolvers"
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

func (r *Resolver) Category() CategoryResolver {
	return &resolvers.CategoryResolver{
		App: r.app,
	}
}

func (r *Resolver) Character() CharacterResolver {
	return &resolvers.CharacterResolver{
		App: r.app,
	}
}

func (r *Resolver) Series() SeriesResolver {
	return &resolvers.SeriesResolver{
		App: r.app,
	}
}

func (r *Resolver) Audience() AudienceResolver {
	return &resolvers.AudienceResolver{
		App: r.app,
	}
}

func (r *Resolver) Club() ClubResolver {
	return &resolvers.ClubResolver{
		App: r.app,
	}
}

func (r *Resolver) Post() PostResolver {
	return &resolvers.PostResolver{
		App: r.app,
	}
}
