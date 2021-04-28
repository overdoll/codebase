package directives

import (
	"context"
	"fmt"
	"strings"

	"github.com/99designs/gqlgen/graphql"
	"github.com/go-playground/validator/v10"
	"github.com/pkg/errors"
	"overdoll/applications/hades/src/helpers"
)

// Roles - check if user has some certain roles
func (s *DirectiveResolver) Role(ctx context.Context, obj interface{}, next graphql.Resolver, roles []string) (res interface{}, err error) {

	user := helpers.UserFromContext(ctx)

	if user == nil {
		return nil, fmt.Errorf("access denied")
	}

	// Check to make sure our user has at least one of the roles
	for _, role := range user.Roles {
		for _, requiredRole := range roles {
			if role == requiredRole {
				return next(ctx)
			}
		}
	}

	return next(ctx)
}

// Verified - check if user is verified
func (s *DirectiveResolver) Verified(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {

	user := helpers.UserFromContext(ctx)

	if user == nil {
		return nil, fmt.Errorf("access denied")
	}

	if user.Verified == false {
		return nil, fmt.Errorf("access denied")
	}

	return next(ctx)
}

// Auth - check if user is authenticated - user object is already passed in middleware, so we can access it directly
func (s *DirectiveResolver) Auth(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {

	user := helpers.UserFromContext(ctx)

	if user == nil {
		return nil, fmt.Errorf("access denied")
	}

	return next(ctx)
}

// Guest - check if user is not authenticated
func (s *DirectiveResolver) Guest(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {

	user := helpers.UserFromContext(ctx)

	if user != nil {
		return nil, fmt.Errorf("access denied")
	}

	return next(ctx)
}

// Validation - perform field validation, using validation plugin (only works with string values)
func (s *DirectiveResolver) Validation(ctx context.Context, obj interface{}, next graphql.Resolver, rules []string) (res interface{}, err error) {

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
