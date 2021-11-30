package principal

import "context"

type principalContextType string

const (
	key = "PrincipalContextKey"
)

func toContext(ctx context.Context, principal *Principal) context.Context {
	return context.WithValue(ctx, principalContextType(key), principal)
}

func FromContext(ctx context.Context) *Principal {
	raw := ctx.Value(principalContextType(key))

	if raw != nil {
		return raw.(*Principal)
	}

	return nil
}
