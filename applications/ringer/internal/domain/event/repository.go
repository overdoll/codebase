package event

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"time"
)

type Repository interface {
	ClubPaymentDeposit(ctx context.Context, request *PaymentRequest) error
	ClubPaymentDeduction(ctx context.Context, request *PaymentRequest) error
	CancelClubPayout(ctx context.Context, pay *payout.ClubPayout) error
	InitiateClubPayout(ctx context.Context, clubId string, depositDate *time.Time) error
	RetryClubPayout(ctx context.Context, payoutId string) error
	UpdateClubPayoutDepositDate(ctx context.Context, pay *payout.ClubPayout, newDate time.Time) error
}
