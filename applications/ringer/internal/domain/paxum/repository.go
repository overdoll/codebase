package paxum

import (
	"context"
)

type Repository interface {
	TransferFunds(ctx context.Context, transfer *Transfer) (*string, error)
}
