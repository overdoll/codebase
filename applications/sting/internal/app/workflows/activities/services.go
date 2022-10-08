package activities

import (
	"context"
	"overdoll/libraries/media"
	"time"
)

type ParleyService interface {
	PutPostIntoModeratorQueueOrPublish(context.Context, string) (bool, error)
}

type LoaderService interface {
	ProcessMediaFromUploads(ctx context.Context, uploadIds []string, link *media.Link) ([]*media.Media, error)
	GenerateImageFromMedia(ctx context.Context, sources []*media.Media, link *media.Link, pixelate *int64) ([]*media.Media, error)
}

type CarrierService interface {
	ClubSupporterRequiredPostReminder(ctx context.Context, clubId string, duration time.Duration) error
	ClubSupporterNoPosts(ctx context.Context, clubId string) error
	ClubSuspended(ctx context.Context, clubId string, endTime time.Time) error
	PostFailedProcessing(ctx context.Context, postId string) error
	NewCreatorLead(ctx context.Context, username, email, portfolio, details string) error
}
