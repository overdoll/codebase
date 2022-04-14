package payment

import (
	"context"
	"overdoll/libraries/money"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetPlatformFeeForClub(ctx context.Context, requester *principal.Principal, clubId string) (*PlatformFee, error)
	GetPlatformFeeForClubOperator(ctx context.Context, clubId string) (*PlatformFee, error)
	CreateNewClubPayment(ctx context.Context, payment *Payment) error
	GetOrCreatePendingBalanceForClub(ctx context.Context, requester *principal.Principal, clubId string) (*Balance, error)
	GetOrCreateBalanceForClub(ctx context.Context, requester *principal.Principal, clubId string) (*Balance, error)
	GetClubPaymentById(ctx context.Context, paymentId string) (*Payment, error)
	GetClubPaymentByAccountTransactionId(ctx context.Context, accountTransactionId string) (*Payment, error)
	IncrementClubPendingBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error
	DecrementClubPendingBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error
	IncrementClubBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error
	DecrementClubBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error
	UpdateClubPaymentStatus(ctx context.Context, paymentId string, updateFn func(pay *Payment) error) (*Payment, error)
	UpdateClubPlatformFee(ctx context.Context, requester *principal.Principal, clubId string, updateFn func(fee *PlatformFee) error) (*PlatformFee, error)
	AddPaymentToClubReadyList(ctx context.Context, payment *Payment) error
	ScanClubReadyPaymentsList(ctx context.Context, clubId string, scanFn func(paymentId string, amount int64, currency money.Currency)) error
}
