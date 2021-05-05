package graphql

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
	"overdoll/libraries/passport"
)

type PassportInjector struct{}

func (a PassportInjector) ExtensionName() string {
	return "PassportInjector"
}

func (a PassportInjector) Validate(schema graphql.ExecutableSchema) error {
	return nil
}

func (a PassportInjector) InterceptResponse(ctx context.Context, next graphql.ResponseHandler) *graphql.Response {
	raw := passport.GetModifiedPassport(ctx)

	if raw != "" {
		res := next(ctx)
		res.Extensions["passport"] = raw
		return res
	}

	return next(ctx)
}
