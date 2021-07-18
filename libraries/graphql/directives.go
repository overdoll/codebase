package graphql

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
	"overdoll/libraries/passport"
)

func Auth(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	return next(ctx)
}
