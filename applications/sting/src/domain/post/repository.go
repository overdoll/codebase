package post

import (
	"context"

	"overdoll/libraries/ksuid"
)

type Repository interface {
	GetPendingPost(ctx context.Context, id ksuid.UUID) (*PostPending, error)
	CreatePendingPost(context.Context, *PostPending) error
	UpdatePendingPost(context.Context, *PostPending) error

	GetPost(ctx context.Context, id ksuid.UUID) (*Post, error)
	CreatePost(context.Context, *Post) error
}

type IndexRepository interface {
}

type EventRepository interface {
	PostCreated(context.Context, *PostPending) error
	PostCompleted(context.Context, *PostPending) error
}
