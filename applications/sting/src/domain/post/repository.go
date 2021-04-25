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

type IndexRepository interface {
	BulkIndexPosts(context.Context, []*Post) error
	BulkIndexPendingPosts(context.Context, []*PostPending) error
	DeletePostIndex(ctx context.Context) error
	DeletePendingPostIndex(ctx context.Context) error
}

type EventRepository interface {
	PostCreated(context.Context, *PostPending) error
	PostCompleted(context.Context, *PostPending) error
	PostPendingUpdated(context.Context, *PostPending) error
}
