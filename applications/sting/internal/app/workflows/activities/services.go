package activities

import (
	"context"
)

type ParleyService interface {
	PutPostIntoModeratorQueueOrPublish(context.Context, string) (bool, error)
}

type StellaService interface {
	NewSupporterPost(ctx context.Context, clubId string) error
}
