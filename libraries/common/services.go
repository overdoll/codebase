package common

import (
	"context"
)

type EvaService interface {
	GetUser(ctx context.Context, id string) (*User, error)
}
