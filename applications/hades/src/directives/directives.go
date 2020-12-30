package directives

import (
	"context"
	"github.com/99designs/gqlgen/graphql"
	gen "project01101000/codebase/applications/hades/src"
)

func NewDirectives() gen.DirectiveRoot {
	return gen.DirectiveRoot{Auth: Auth}
}

func Auth(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {
	return next(ctx)
}
