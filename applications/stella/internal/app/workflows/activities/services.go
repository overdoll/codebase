package activities

import (
	"context"
	"time"
)

type StingService interface {
	AddSuspendedClub(ctx context.Context, clubId string) error
	RemoveSuspendedClub(ctx context.Context, clubId string) error
}

type CarrierService interface {
	ClubSupporterRequiredPostReminder(ctx context.Context, clubId string, duration time.Duration) error
	ClubSupporterNoPosts(ctx context.Context, clubId string) error
}
