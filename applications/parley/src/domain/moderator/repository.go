package moderator

import (
	"context"
)

type Repository interface {
	GetModerators(context.Context) ([]*Moderator, error)
}
