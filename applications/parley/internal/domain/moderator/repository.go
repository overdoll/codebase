package moderator

import (
	"context"
	"overdoll/libraries/paging"

	"overdoll/libraries/principal"
)

type Repository interface {
	GetModerators(ctx context.Context) ([]*Moderator, error)
	UpdateModerator(ctx context.Context, accountId string, updateFn func(moderator *Moderator) error) (*Moderator, error)

	GetModerator(ctx context.Context, requester *principal.Principal, accountId string) (*Moderator, error)
	RemoveModerator(ctx context.Context, requester *principal.Principal, accountId string) error
	CreateModerator(ctx context.Context, moderator *Moderator) error

	SearchPostModeratorQueue(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*PostModeratorQueue, error)
	CreatePostModeratorQueue(ctx context.Context, queue *PostModeratorQueue) error
}
