package cookie

import (
	"context"

	"overdoll/libraries/ksuid"
)

type Repository interface {
	GetCookieById(ctx context.Context, id ksuid.UUID) (*Cookie, error)
	DeleteCookieById(ctx context.Context, id ksuid.UUID) error
	CreateCookie(ctx context.Context, instance *Cookie) (*Cookie, error)
	UpdateCookie(ctx context.Context, instance *Cookie) error
}
