package event

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/principal"
	"time"
)

type Repository interface {
	AddClubSupporter(ctx context.Context, clubId, accountId string, supportedAt time.Time) error
	RemoveClubSupporter(ctx context.Context, clubId, accountId string) error
	AddClubMember(ctx context.Context, member *club.Member) error
	RemoveClubMember(ctx context.Context, member *club.Member) error
	SuspendClub(ctx context.Context, requester *principal.Principal, club *club.Club, endTime time.Time, reason string) error
	SuspendClubOperator(ctx context.Context, club *club.Club, accountId *string, endTime time.Time, reason string) error
	UnSuspendClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error
	NewSupporterPost(ctx context.Context, clubId string) error

	TerminateClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error
	UnTerminateClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error
}
