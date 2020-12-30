package directives

import (
	"context"
	"fmt"
	"github.com/99designs/gqlgen/graphql"
	gen "project01101000/codebase/applications/hades/src"
	"project01101000/codebase/applications/hades/src/helpers"
)

func NewDirectives() gen.DirectiveRoot {
	return gen.DirectiveRoot{Auth: Auth}
}

// Auth - check if user is authenticated - user object is already passed in middleware, so we can access it directly
func Auth(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {

	user := helpers.UserFromContext(ctx)

	if user == nil {
		return nil, fmt.Errorf("access denied")
	}

	return next(ctx)
}
