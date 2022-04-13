package gen

import (
	"overdoll/applications/ringer/internal/app"
)

type Resolver struct {
	app *app.Application
}

func NewResolver(app *app.Application) *Resolver {
	return &Resolver{app: app}
}
