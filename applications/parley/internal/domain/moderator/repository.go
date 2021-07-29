package moderator

import (
	"context"

	"overdoll/libraries/principal"
)

type Repository interface {
	GetModeratorsOperator(ctx context.Context) ([]*Moderator, error)
	UpdateModeratorOperator(ctx context.Context, accountId string, updateFn func(moderator *Moderator) error) (*Moderator, error)

	GetModerator(ctx context.Context, requester *principal.Principal, accountId string) (*Moderator, error)
	RemoveModerator(ctx context.Context, requester *principal.Principal, accountId string) error
	CreateModerator(ctx context.Context, requester *principal.Principal, moderator *Moderator) error
}
