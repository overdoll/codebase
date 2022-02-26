package gen

import (
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/ports/graphql/entities"
	"overdoll/applications/hades/internal/ports/graphql/mutations"
	"overdoll/applications/hades/internal/ports/graphql/queries"
	"overdoll/applications/hades/internal/ports/graphql/resolvers"
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

func (r *Resolver) Club() ClubResolver {
	return &resolvers.ClubResolver{
		App: r.app,
	}
}

func (r *Resolver) AccountClubSupporterSubscription() AccountClubSupporterSubscriptionResolver {
	return &resolvers.AccountClubSupporterSubscriptionResolver{
		App: r.app,
	}
}

func (r *Resolver) CCBillTransactionDetails() CCBillTransactionDetailsResolver {
	return &resolvers.CCBillTransactionDetailsResolver{
		App: r.app,
	}
}
