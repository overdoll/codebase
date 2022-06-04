package principal

import (
	"context"
)

type contextKey string

const (
	key = "PrincipalContextKey"
)

func toContext(ctx context.Context, principal *Principal) context.Context {
	return context.WithValue(ctx, contextKey(key), principal)
}

func FromContext(ctx context.Context) *Principal {

	raw, ok := ctx.Value(contextKey(key)).(*Principal)

	if !ok {
		return nil
	}

	return raw
}
