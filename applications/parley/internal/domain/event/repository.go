package event

import (
	"context"
)

type Repository interface {
	PutPostIntoModeratorQueue(ctx context.Context, postId string) error
}
