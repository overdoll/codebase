package session

import (
	"context"
)

type Repository interface {
	RevokeSession(context.Context, *Session) error
	CheckSession(context.Context, *Session) error
	CreateSession(context.Context, *Session) error
}
