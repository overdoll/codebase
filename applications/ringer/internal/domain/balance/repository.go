package balance

import (
	"context"
	"overdoll/libraries/money"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetPendingBalanceForClub(ctx context.Context, requester *principal.Principal, clubId string) (*ClubBalance, error)
	GetBalanceForClub(ctx context.Context, requester *principal.Principal, clubId string) (*ClubBalance, error)
	IncrementClubPendingBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error
	DecrementClubPendingBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error
	IncrementClubBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error
	DecrementClubBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error
}
