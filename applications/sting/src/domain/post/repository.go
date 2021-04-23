package post

import (
	"context"

	"overdoll/libraries/ksuid"
)

type Repository interface {
	GetPendingPost(context.Context, ksuid.UUID) (*PostPending, error)
	CreatePendingPost(context.Context, *PostPending) error
	UpdatePendingPost(context.Context, *PostPending) error

	CreatePost(context.Context, *Post) error
}
