package command

import (
	"context"
	"overdoll/libraries/location"
	"time"
)

type StellaService interface {
	CanAccountBecomeClubSupporter(ctx context.Context, clubId, accountId string) (bool, error)
	AddClubSupporter(ctx context.Context, clubId, accountId string, supportedAt time.Time) error
	RemoveClubSupporter(ctx context.Context, clubId, accountId string) error
}

type EvaService interface {
	LocationFromIp(ctx context.Context, ip string) (*location.Location, error)
}
