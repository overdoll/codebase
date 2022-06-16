package gen

import (
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/ports/graphql/entities"
	"overdoll/applications/sting/internal/ports/graphql/mutations"
	"overdoll/applications/sting/internal/ports/graphql/queries"
	"overdoll/applications/sting/internal/ports/graphql/resolvers"
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

func (r *Resolver) AudienceCurationProfile() AudienceCurationProfileResolver {
	return &resolvers.AudienceCurationProfileResolver{
		App: r.app,
	}
}

func (r *Resolver) CategoryCurationProfile() CategoryCurationProfileResolver {
	return &resolvers.CategoryCurationProfileResolver{
		App: r.app,
	}
}

func (r *Resolver) ClubMember() ClubMemberResolver {
	return &resolvers.ClubMemberResolver{
		App: r.app,
	}
}
