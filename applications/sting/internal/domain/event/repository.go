package event

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"time"
)

type Repository interface {
	PublishPost(ctx context.Context, postId string) error
	DeletePost(ctx context.Context, postId string) error
	ArchivePost(ctx context.Context, postId string) error
	UnArchivePost(ctx context.Context, postId string) error
	DiscardPost(ctx context.Context, postId string) error
	SubmitPost(ctx context.Context, postId string, postTime time.Time) error
	RemovePost(ctx context.Context, postId string) error
	AddPostLike(ctx context.Context, like *post.Like) error
	RemovePostLike(ctx context.Context, like *post.Like) error

	DeleteAccountData(ctx context.Context, postId string) error
}
