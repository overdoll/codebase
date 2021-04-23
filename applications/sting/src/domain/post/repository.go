package post

import (
	"context"
)

type Repository interface {
	CreatePendingPost(context.Context, *PostPending) error
	UpdatePendingPost(context.Context, *PostPending) error

	CreatePost(context.Context, *Post) error
}
