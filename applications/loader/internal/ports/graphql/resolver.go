package gen

import (
	"go.temporal.io/sdk/client"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/ports/graphql/entities"
)

type Resolver struct {
	app    *app.Application
	client client.Client
}

func NewResolver(app *app.Application, client client.Client) *Resolver {
	return &Resolver{app: app, client: client}
}

func (r *Resolver) Entity() EntityResolver {
	return &entities.EntityResolver{
		App: r.app,
	}
}
