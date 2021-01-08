package directives

import (
	"context"
	"fmt"
	"strings"

	"github.com/99designs/gqlgen/graphql"
	gen "project01101000/codebase/applications/hades/src"
	"project01101000/codebase/applications/hades/src/helpers"
	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

func NewDirectives() gen.DirectiveRoot {
	return gen.DirectiveRoot{Auth: Auth, Validation: Validation}
}

// Auth - check if user is authenticated - user object is already passed in middleware, so we can access it directly
func Auth(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {

	user := helpers.UserFromContext(ctx)

	if user == nil {
		return nil, fmt.Errorf("access denied")
	}

	return next(ctx)
}

// Validation - perform field validation, using validation plugin
func Validation(ctx context.Context, obj interface{}, next graphql.Resolver, rules []string) (res interface{}, err error) {

	data := strings.Join(rules, ",")

	errs := validate.Var(obj, data)

	if errs != nil {
		return nil, errs
	}

	return next(ctx)
}
