package token

import (
	"context"
)

type Repository interface {
	GetAuthenticationTokenById(ctx context.Context, tokenId string) (*AuthenticationToken, error)
	DeleteAuthenticationTokenById(ctx context.Context, tokenId string) error
	CreateAuthenticationToken(ctx context.Context, authenticationToken *AuthenticationToken) error
	UpdateAuthenticationToken(ctx context.Context, tokenId string, updateFn func(authenticationToken *AuthenticationToken) error) (*AuthenticationToken, error)
}
