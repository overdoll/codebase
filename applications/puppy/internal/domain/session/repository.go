package session

import (
	"context"
)

type Repository interface {
	GetSession(ctx context.Context, sessionId string) (bool, string, int64, error)
	RevokeSession(ctx context.Context, sessionId string) error
	CreateSession(ctx context.Context, accountId string) (string, int64, error)
}
