package gen

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

import (
	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/ports/graphql/entities"
	"overdoll/applications/parley/src/ports/graphql/queries"
)

type Resolver struct {
	app *app.Application
}

func NewResolver(app *app.Application) *Resolver {
	return &Resolver{app: app}
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
