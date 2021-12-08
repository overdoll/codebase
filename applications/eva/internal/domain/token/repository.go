package token

import (
	"context"
	"overdoll/libraries/passport"
)

type Repository interface {
	GetAuthenticationToken(ctx context.Context, token string) (*AuthenticationToken, error)
	DeleteAuthenticationToken(ctx context.Context, passport *passport.Passport, token string) error
	CreateAuthenticationToken(ctx context.Context, authenticationToken *AuthenticationToken) error
	UpdateAuthenticationToken(ctx context.Context, token string, updateFn func(authenticationToken *AuthenticationToken) error) (*AuthenticationToken, error)
}
