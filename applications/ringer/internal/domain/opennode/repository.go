package opennode

import (
	"context"
)

type Repository interface {
	InitiatePayout(ctx context.Context, transfers []*Transfer) error
}
