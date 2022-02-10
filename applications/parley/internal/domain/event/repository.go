package moderator

import (
	"context"
)

type Repository interface {
	PublishEvent(ctx context.Context) error
}
