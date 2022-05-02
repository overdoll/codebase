package gen

import (
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/ports/graphql/entities"
	"overdoll/applications/parley/internal/ports/graphql/mutations"
	"overdoll/applications/parley/internal/ports/graphql/queries"
	"overdoll/applications/parley/internal/ports/graphql/resolvers"
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

func (r *Resolver) Post() PostResolver {
	return &resolvers.PostResolver{
		App: r.app,
	}
}

func (r *Resolver) Club() ClubResolver {
	return &resolvers.ClubResolver{
		App: r.app,
	}
}

func (r *Resolver) ClubInfractionHistory() ClubInfractionHistoryResolver {
	return &resolvers.ClubInfractionHistory{
		App: r.app,
	}
}

func (r *Resolver) PostAuditLog() PostAuditLogResolver {
	return &resolvers.PostAuditLog{
		App: r.app,
	}
}

func (r *Resolver) PostReport() PostReportResolver {
	return &resolvers.PostReport{
		App: r.app,
	}
}

func (r *Resolver) Rule() RuleResolver {
	return &resolvers.RuleResolver{
		App: r.app,
	}
}
