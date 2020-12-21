package resolvers

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

import (
	"project01101000/codebase/applications/hades/services"
)

type Resolver struct {
	services services.Services
}

func NewResolver(s services.Services) *Resolver {
	return &Resolver{services: s}
}
