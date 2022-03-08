package event

import (
	"context"
)

type Repository interface {
	PutPostIntoModeratorQueue(ctx context.Context, postId string) error

	ApprovePost(ctx context.Context, postId string) error
	RemovePost(ctx context.Context, postId, ruleId string, notes *string) error
	RejectPost(ctx context.Context, postId, ruleId string, notes *string) error
}
