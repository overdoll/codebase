package directives

import (
	"context"
	"fmt"
	"strings"

	"github.com/99designs/gqlgen/graphql"
	"github.com/go-playground/validator/v10"
	"github.com/pkg/errors"
	gen "project01101000/codebase/applications/hades/src"
	"project01101000/codebase/applications/hades/src/helpers"
)

var validate *validator.Validate

func NewDirectives() gen.DirectiveRoot {
	return gen.DirectiveRoot{Auth: Auth, Validation: Validation, Guest: Guest}
}

// Auth - check if user is authenticated - user object is already passed in middleware, so we can access it directly
func Auth(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {

	user := helpers.UserFromContext(ctx)

	if user == nil {
		return nil, fmt.Errorf("access denied")
	}

	return next(ctx)
}

// Guest - check if user is not authenticated
func Guest(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {

	user := helpers.UserFromContext(ctx)

	if user != nil {
		return nil, fmt.Errorf("access denied")
	}

	return next(ctx)
}

// Validation - perform field validation, using validation plugin (only works with string values)
func Validation(ctx context.Context, obj interface{}, next graphql.Resolver, rules []string) (res interface{}, err error) {

	validate = validator.New()

	obj, err = next(ctx)
	if err != nil {
		return nil, err
	}

	pathContext := graphql.GetPathContext(ctx)
	fieldName := ""

	// Get field name first
	if pathContext != nil {
		fieldName = *pathContext.Field
	} else {
		fieldName = graphql.GetFieldContext(ctx).Field.Name
	}

	switch value := obj.(type) {
	// Validation only works on string inputs for now
	case string:
		data := strings.Join(rules, ",")

		errs := validate.VarCtx(ctx, value, data)

		if errs != nil {
			return nil, errs
		}

		return next(ctx)

	default:
		return nil, errors.Errorf("field \"%s\" must be a string", fieldName)
	}
}
