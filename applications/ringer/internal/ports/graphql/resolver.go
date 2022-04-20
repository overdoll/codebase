package gen

import (
	"overdoll/applications/ringer/internal/app"
	"overdoll/applications/ringer/internal/ports/graphql/entities"
	"overdoll/applications/ringer/internal/ports/graphql/mutations"
	"overdoll/applications/ringer/internal/ports/graphql/queries"
	"overdoll/applications/ringer/internal/ports/graphql/resolvers"
)

type Resolver struct {
	app *app.Application
}

func NewResolver(app *app.Application) *Resolver {
	return &Resolver{app: app}
}

func (r Resolver) Entity() EntityResolver {
	return &entities.EntityResolver{
		App: r.app,
	}
}

func (r Resolver) Mutation() MutationResolver {
	return &mutations.MutationResolver{
		App: r.app,
	}
}

func (r Resolver) Query() QueryResolver {
	return &queries.QueryResolver{
		App: r.app,
	}
}

func (r Resolver) Account() AccountResolver {
	return &resolvers.AccountResolver{
		App: r.app,
	}
}

func (r Resolver) Club() ClubResolver {
	return &resolvers.ClubResolver{
		App: r.app,
	}
}

func (r Resolver) ClubPayout() ClubPayoutResolver {
	return &resolvers.ClubPayoutResolver{
		App: r.app,
	}
}

func (r Resolver) DepositRequest() DepositRequestResolver {
	return &resolvers.DepositRequestResolver{
		App: r.app,
	}
}
