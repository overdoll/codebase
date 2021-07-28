package session

import (
	"context"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetSessionsByAccountId(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, currentSessionId, accountId string) ([]*Session, error)
	RevokeSessionById(ctx context.Context, requester *principal.Principal, sessionId string) error
	GetSessionById(ctx context.Context, requester *principal.Principal, sessionId string) (*Session, error)
}
