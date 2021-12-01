package session

import (
	"context"
	"github.com/gorilla/sessions"
)

type Repository interface {
	Load(ctx context.Context, session *sessions.Session) (*sessions.Session, error)
	Delete(ctx context.Context, session *sessions.Session) error
	Save(ctx context.Context, session *sessions.Session) (*sessions.Session, error)
}
