package gen

import (
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/ports/graphql/entities"
)

type Resolver struct {
	app *app.Application
}

func NewResolver(app *app.Application) *Resolver {
	return &Resolver{app: app}
}

func (r *Resolver) Entity() EntityResolver {
	return &entities.EntityResolver{
		App: r.app,
	}
}
