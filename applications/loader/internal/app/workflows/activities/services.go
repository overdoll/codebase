package activities

import (
	"context"
	"overdoll/applications/loader/internal/domain/resource"
)

type CallbackService interface {
	SendCallback(ctx context.Context, source string, resources []*resource.Resource) error
}
