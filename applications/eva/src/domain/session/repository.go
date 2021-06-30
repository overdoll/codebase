package session

import (
	"context"
)

type Repository interface {
	GetSessionsByAccountId(context.Context, string) ([]*Session, error)
	RevokeSessionById(context.Context, string, string) error
}
