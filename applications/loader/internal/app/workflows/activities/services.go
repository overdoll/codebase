package activities

import (
	"context"
)

type CallbackService interface {
	SendCallback(ctx context.Context, source string, resources []*resource.Resource) error
}
