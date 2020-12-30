package helpers

import (
	"context"
	"project01101000/codebase/applications/hades/src/middleware"
)

func UserFromContext(ctx context.Context) *middleware.User {
	raw, _ := ctx.Value("UserContextKey").(*middleware.User)
	return raw
}
