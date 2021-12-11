package session

import "context"

type Repository interface {
	GetSession(ctx context.Context, sessionId string) (bool, string, error)
	RevokeSession(ctx context.Context, sessionId string) error
	CreateSession(ctx context.Context, accountId string) (string, error)
}
