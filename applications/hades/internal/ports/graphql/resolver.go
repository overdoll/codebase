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

func (r *Resolver) CCBillTransactionDetails() CCBillTransactionDetailsResolver {
	return &resolvers.CCBillTransactionDetailsResolver{
		App: r.app,
	}
}
func (r *Resolver) AccountActiveClubSupporterSubscription() AccountActiveClubSupporterSubscriptionResolver {
	return &resolvers.AccountActiveClubSupporterSubscriptionResolver{
		App: r.app,
	}
}

func (r *Resolver) AccountCancelledClubSupporterSubscription() AccountCancelledClubSupporterSubscriptionResolver {
	return &resolvers.AccountCancelledClubSupporterSubscriptionResolver{
		App: r.app,
	}
}

func (r *Resolver) AccountInactiveClubSupporterSubscription() AccountInactiveClubSupporterSubscriptionResolver {
	return &resolvers.AccountInactiveClubSupporterSubscriptionResolver{
		App: r.app,
	}
}

func (r *Resolver) AccountTransaction() AccountTransactionResolver {
	return &resolvers.AccountTransactionResolver{
		App: r.app,
	}
}
