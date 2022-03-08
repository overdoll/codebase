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

	GetPostModeratorByPostIdOperator(ctx context.Context, postId string) (*PostModerator, error)
	GetPostModeratorByPostId(ctx context.Context, requester *principal.Principal, postId string) (*PostModerator, error)
	SearchPostModerator(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*PostModerator, error)
	CreatePostModerator(ctx context.Context, queue *PostModerator) error
	DeletePostModerator(ctx context.Context, queue *PostModerator) error
}
