package domain

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/ksuid"
)

type EvaService interface {
	GetUser(ctx context.Context, id ksuid.UUID) (*post.User, error)
}
