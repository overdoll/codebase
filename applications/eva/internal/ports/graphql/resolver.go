package gen

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

func (r *Resolver) Mutation() MutationResolver {
	return &mutations.MutationResolver{
		App: r.app,
	}
}

func (r *Resolver) Query() QueryResolver {
	return &queries.QueryResolver{
		App: r.app,
	}
}

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

func (r *Resolver) AccountEmail() AccountEmailResolver {
	return &resolvers.AccountEmailResolver{
		App: r.app,
	}
}
