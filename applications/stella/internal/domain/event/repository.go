package event

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"time"
)

type Repository interface {
	AddClubSupporter(ctx context.Context, clubId, accountId string, supportedAt time.Time) error
	RemoveClubSupporter(ctx context.Context, clubId, accountId string) error
	AddClubMember(ctx context.Context, member *club.Member) error
	RemoveClubMember(ctx context.Context, member *club.Member) error
	SuspendClub(ctx context.Context, clubId string, accountId *string, endTime time.Time, reason string) error
	UnSuspendClub(ctx context.Context, clubId, accountId string) error
	NewSupporterPost(ctx context.Context, clubId string) error

	TerminateClub(ctx context.Context, clubId, accountId string) error
	UnTerminateClub(ctx context.Context, clubId string) error
}
