package token

import (
	"context"
)

type Repository interface {
	GetAuthenticationTokenById(context.Context, string) (*AuthenticationToken, error)
	DeleteAuthenticationTokenById(context.Context, string) error
	CreateAuthenticationToken(context.Context, *AuthenticationToken) error
	UpdateAuthenticationToken(context.Context, string, func(*AuthenticationToken) error) (*AuthenticationToken, error)
}
