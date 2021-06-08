package moderator

import (
	"context"
)

type Repository interface {
	GetModerators(context.Context) ([]*Moderator, error)
	GetModerator(context.Context, string) (*Moderator, error)
	UpdateModerator(context.Context, string, func(*Moderator) error) (*Moderator, error)
}
