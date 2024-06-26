package session

import (
	"context"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"

	"overdoll/libraries/principal"
)

type Repository interface {
	GetLastActiveSessionByAccountIdOperator(ctx context.Context, accountId string) (*Session, error)
	GetSessionsByAccountId(ctx context.Context, requester *principal.Principal, passport *passport.Passport, cursor *paging.Cursor, accountId string) ([]*Session, error)
	GetSessionsByAccountIdOperator(ctx context.Context, accountId string) ([]*Session, error)
	RevokeSessionById(ctx context.Context, requester *principal.Principal, passport *passport.Passport, sessionId string) error
	GetSessionById(ctx context.Context, requester *principal.Principal, passport *passport.Passport, sessionId string) (*Session, error)

	CreateSessionOperator(ctx context.Context, session *Session) error
	UpdateSessionOperator(ctx context.Context, sessionId string, updateFn func(session *Session) error) (*Session, error)
	RevokeSessionOperator(ctx context.Context, sessionId string) error

	DeleteAccountSessionData(ctx context.Context, accountId string) error
}
