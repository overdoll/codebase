package app

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type EvaService interface {
	GetUser(ctx context.Context, id string) (*post.User, error)
}
