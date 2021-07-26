package moderator

import (
	"context"
)

type Repository interface {
	GetModerators(ctx context.Context) ([]*Moderator, error)
	GetModerator(ctx context.Context, accountId string) (*Moderator, error)
	UpdateModerator(ctx context.Context, accountId string, updateFn func(moderator *Moderator) error) (*Moderator, error)
	RemoveModerator(ctx context.Context, accountId string) error
	CreateModerator(ctx context.Context, moderator *Moderator) error
}
