package balance

import (
	"context"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetPendingBalanceForClub(ctx context.Context, requester *principal.Principal, clubId string) (*ClubBalance, error)
	GetBalanceForClub(ctx context.Context, requester *principal.Principal, clubId string) (*ClubBalance, error)
	UpdateClubBalance(ctx context.Context, clubId string, updateFn func(*ClubBalance) error) error
	UpdateClubPendingBalance(ctx context.Context, clubId string, updateFn func(*ClubBalance) error) error
}
