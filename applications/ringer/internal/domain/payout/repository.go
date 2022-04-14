package payout

import (
	"context"
	"time"
)

type Repository interface {
	CreateClubPayout(ctx context.Context, payout *Payout) error
	GetDepositRequestForMonth(ctx context.Context, time time.Time) error
	GetAccountPayoutMethods(ctx context.Context, accountId string) ([]*AccountPayoutMethod, error)
	GetPayoutById(ctx context.Context, payoutId string) (*Payout, error)
	GetAccountPayoutMethodById(ctx context.Context, accountPayoutMethodId string) (*AccountPayoutMethod, error)
}
