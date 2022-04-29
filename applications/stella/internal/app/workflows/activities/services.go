package activities

import (
	"context"
)

type StingService interface {
	AddSuspendedClub(ctx context.Context, clubId string) error
	RemoveSuspendedClub(ctx context.Context, clubId string) error
}
