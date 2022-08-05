package activities

import (
	"context"
	"overdoll/applications/parley/internal/domain/post"
)

type StingService interface {
	GetPost(context.Context, string) (*post.Post, error)
	PublishPost(context.Context, string) error
	RejectPost(context.Context, string) error
	DiscardPost(context.Context, string) error
	RemovePost(context.Context, string) error
	SuspendClub(ctx context.Context, clubId string, endTime int64, isModerationQueue bool, isPostRemoval bool) error
}

type CarrierService interface {
	SendModeratorPostInQueueNotification(ctx context.Context, accountId string) error
}
