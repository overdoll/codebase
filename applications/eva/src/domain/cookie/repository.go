package cookie

import (
	"context"

	"overdoll/libraries/ksuid"
)

type Repository interface {
	GetCookieById(context.Context, ksuid.UUID) (*Cookie, error)
	DeleteCookieById(context.Context, ksuid.UUID) error
	CreateCookie(context.Context, *Cookie) error
	UpdateCookie(context.Context, *Cookie) error
}
