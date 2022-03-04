package event

import (
	"context"
	"time"
)

type Repository interface {
	AddClubSupporter(ctx context.Context, clubId, accountId string, supportedAt time.Time) error
	RemoveClubSupporter(ctx context.Context, clubId, accountId string) error
	AddClubMember(ctx context.Context, clubId, accountId string) error
	RemoveClubMember(ctx context.Context, clubId, accountId string) error
}
