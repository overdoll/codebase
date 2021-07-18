package session

import (
	"context"

	"overdoll/libraries/paging"
)

type Repository interface {
	GetSessionsByAccountId(context.Context, *paging.Cursor, string, string) ([]*Session, *paging.Info, error)
	RevokeSessionById(context.Context, string, string) error
}
