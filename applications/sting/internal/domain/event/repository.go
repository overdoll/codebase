package event

import (
	"context"
)

type Repository interface {
	PublishPost(ctx context.Context, postId string) error
	DiscardPost(ctx context.Context, postId string) error
	SubmitPost(ctx context.Context, postId string) error
	RemovePost(ctx context.Context, postId string) error
	AddPostLike(ctx context.Context, postId, accountId string) error
	RemovePostLike(ctx context.Context, postId, accountId string) error
}
