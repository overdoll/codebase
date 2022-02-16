package gen

import (
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/ports/graphql/mutations"
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

//func (r *Resolver) Query() QueryResolver {
//	return &queries.QueryResolver{
//		App: r.app,
//	}
//}
//
//func (r *Resolver) Entity() EntityResolver {
//	return &entities.EntityResolver{
//		App: r.app,
//	}
//}
