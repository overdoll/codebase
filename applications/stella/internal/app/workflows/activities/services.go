package activities

import (
	"context"
	"time"
)

type StingService interface {
	AddTerminatedClub(ctx context.Context, clubId string) error
	RemoveTerminatedClub(ctx context.Context, clubId string) error
}

type CarrierService interface {
	ClubSupporterRequiredPostReminder(ctx context.Context, clubId string, duration time.Duration) error
	ClubSupporterNoPosts(ctx context.Context, clubId string) error
}
