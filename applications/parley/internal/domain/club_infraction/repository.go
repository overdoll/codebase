package club_infraction

import (
	"context"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	CreateClubInfractionReason(ctx context.Context, clubInfractionReason *ClubInfractionReason) error
	GetClubInfractionReasons(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, deprecated bool) ([]*ClubInfractionReason, error)
	GetClubInfractionReasonById(ctx context.Context, requester *principal.Principal, clubInfractionReasonId string) (*ClubInfractionReason, error)
	UpdateClubInfractionReasonDeprecated(ctx context.Context, clubInfractionReasonId string, updateFn func(clubInfractionReason *ClubInfractionReason) error) (*ClubInfractionReason, error)
	UpdateClubInfractionReasonTitle(ctx context.Context, clubInfractionReasonId string, updateFn func(clubInfractionReason *ClubInfractionReason) error) (*ClubInfractionReason, error)
	UpdateClubInfractionReasonDescription(ctx context.Context, clubInfractionReasonId string, updateFn func(clubInfractionReason *ClubInfractionReason) error) (*ClubInfractionReason, error)

	CreateClubInfractionHistory(ctx context.Context, clubInfraction *ClubInfractionHistory) error
	DeleteClubInfractionHistory(ctx context.Context, requester *principal.Principal, clubInfraction *ClubInfractionHistory) error
	GetClubInfractionHistoryByClubId(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*ClubInfractionHistory, error)
	GetClubInfractionHistoryById(ctx context.Context, requester *principal.Principal, clubId, historyId string) (*ClubInfractionHistory, error)
}
