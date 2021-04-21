package cookie

import (
	"context"

	"overdoll/libraries/ksuid"
)

type Repository interface {
	GetCookieById(ctx context.Context, id ksuid.UUID)
	DeleteCookieById(ctx context.Context, id ksuid.UUID)
	CreateCookie(ctx context.Context, instance *Cookie)
}
