package post

import (
	"context"

	"overdoll/libraries/ksuid"
)

type Repository interface {
	GetPendingPost(ctx context.Context, id ksuid.UUID) (*PostPending, error)
	CreatePendingPost(context.Context, *PostPending) error
	UpdatePendingPost(context.Context, *PostPending) error

	CreatePost(context.Context, *Post) error
}
