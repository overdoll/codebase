package event

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
	"time"
)

type Repository interface {
	PublishPost(ctx context.Context, postId string) error
	DeletePost(ctx context.Context, requester *principal.Principal, pst *post.Post) error
	ArchivePost(ctx context.Context, requester *principal.Principal, pst *post.Post) error
	UnArchivePost(ctx context.Context, requester *principal.Principal, pst *post.Post) error
	DiscardPost(ctx context.Context, postId string) error
	SubmitPost(ctx context.Context, requester *principal.Principal, pst *post.Post, postTime time.Time) error
	RemovePost(ctx context.Context, postId string) error
	AddPostLike(ctx context.Context, like *post.Like) error
	RemovePostLike(ctx context.Context, like *post.Like) error

	DeleteAccountData(ctx context.Context, postId string) error
}
