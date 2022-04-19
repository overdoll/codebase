package paxum

import (
	"context"
)

type Repository interface {
	InitiatePayout(ctx context.Context, transfer *Transfer) error
}
