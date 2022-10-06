package token

import (
	"context"
	"overdoll/libraries/passport"
)

type Repository interface {
	GetAuthenticationToken(ctx context.Context, passport *passport.Passport, token string, secret *string) (*AuthenticationToken, error)
	DeleteAuthenticationToken(ctx context.Context, passport *passport.Passport, token string, secret *string) error
	CreateAuthenticationToken(ctx context.Context, authenticationToken *AuthenticationToken, tempor *TemporaryState) error
	UpdateAuthenticationToken(ctx context.Context, passport *passport.Passport, token, secret string, updateFn func(authenticationToken *AuthenticationToken) error) (*AuthenticationToken, error)
}
