package passport

import (
	"context"
)

type MutationType string

const (
	MutationKey = "PassportContextKey"
)

func WithContext(ctx context.Context, passport *Passport) context.Context {
	return context.WithValue(ctx, MutationType(MutationKey), passport)
}

func fromContext(ctx context.Context) *Passport {

	raw, ok := ctx.Value(MutationType(MutationKey)).(*Passport)

	if !ok {
		return nil
	}

	return raw
}

func FromContext(ctx context.Context) *Passport {
	return fromContext(ctx)
}
