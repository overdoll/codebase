package principal

import (
	"context"
)

type ContextTypePrincipal string

const (
	key = "PrincipalContextKey"
)

func toContext(ctx context.Context, principal *Principal) context.Context {
	return context.WithValue(ctx, ContextTypePrincipal(key), principal)
}

func FromContext(ctx context.Context) *Principal {

	raw, ok := ctx.Value(ContextTypePrincipal(key)).(*Principal)

	if !ok {
		return nil
	}

	return raw
}
