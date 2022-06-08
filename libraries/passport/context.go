package passport

import (
	"context"
)

type contextKey string

const (
	key = "PassportContextKey"
)

func withContext(ctx context.Context, passport *Passport) context.Context {
	return context.WithValue(ctx, contextKey(key), passport)
}

func fromContext(ctx context.Context) *Passport {

	raw, ok := ctx.Value(contextKey(key)).(*Passport)

	if !ok {
		return nil
	}

	return raw
}

func FromContext(ctx context.Context) *Passport {
	return fromContext(ctx)
}
