package activities

import (
	"context"
)

type ParleyService interface {
	GetNextModeratorId(context.Context) (string, error)
}
