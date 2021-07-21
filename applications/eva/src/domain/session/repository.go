package session

import (
	"context"

	"overdoll/libraries/paging"
)

type Repository interface {
	GetSessionsByAccountId(ctx context.Context, cursor *paging.Cursor, currentSessionId, accountId string) ([]*Session, error)
	RevokeSessionById(ctx context.Context, accountId, sessionId string) error
	GetSessionById(ctx context.Context, sessionId string) (*Session, error)
}
