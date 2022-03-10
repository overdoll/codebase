package club_infraction

import (
	"context"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	CreateClubInfractionHistory(ctx context.Context, clubInfraction *ClubInfractionHistory) error
	DeleteClubInfractionHistory(ctx context.Context, requester *principal.Principal, clubInfraction *ClubInfractionHistory) error
	GetClubInfractionHistoryByClubId(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*ClubInfractionHistory, error)
	GetAllClubInfractionHistoryByClubIdOperator(ctx context.Context, accountId string) ([]*ClubInfractionHistory, error)
	GetClubInfractionHistoryById(ctx context.Context, requester *principal.Principal, clubId, historyId string) (*ClubInfractionHistory, error)
}
