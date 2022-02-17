package command

import (
	"context"
	"time"
)

type StellaService interface {
	CanAccountBecomeClubSupporter(ctx context.Context, clubId, accountId string) (bool, error)
	AddClubSupporter(ctx context.Context, clubId, accountId string, supportedAt time.Time) error
	RemoveClubSupporter(ctx context.Context, clubId, accountId string) error
}
