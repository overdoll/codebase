package payment

import (
	"context"
	"overdoll/libraries/money"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetPlatformFeeForClub(ctx context.Context, requester *principal.Principal, clubId string) (*PlatformFee, error)
	GetPlatformFeeForClubOperator(ctx context.Context, clubId string) (*PlatformFee, error)
	CreateNewClubPayment(ctx context.Context, payment *ClubPayment) error
	GetOrCreatePendingBalanceForClub(ctx context.Context, requester *principal.Principal, clubId string) (*Balance, error)
	GetOrCreateBalanceForClub(ctx context.Context, requester *principal.Principal, clubId string) (*Balance, error)
	GetClubPaymentsByPayout(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, payoutId string) ([]*ClubPayment, error)
	GetClubPaymentsByClub(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, clubId string) ([]*ClubPayment, error)
	GetClubPaymentById(ctx context.Context, requester *principal.Principal, paymentId string) (*ClubPayment, error)
	GetClubPaymentByIdOperator(ctx context.Context, paymentId string) (*ClubPayment, error)
	GetClubPaymentByAccountTransactionId(ctx context.Context, accountTransactionId string) (*ClubPayment, error)
	IncrementClubPendingBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error
	DecrementClubPendingBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error
	IncrementClubBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error
	DecrementClubBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error
	UpdateClubPaymentStatus(ctx context.Context, paymentId string, updateFn func(pay *ClubPayment) error) (*ClubPayment, error)
	UpdateClubPlatformFee(ctx context.Context, requester *principal.Principal, clubId string, updateFn func(fee *PlatformFee) error) (*PlatformFee, error)
	AddPaymentToClubReadyList(ctx context.Context, payment *ClubPayment) error
	ScanClubReadyPaymentsList(ctx context.Context, clubId string, scanFn func(paymentId string, amount int64, currency money.Currency)) error
	GetClubPaymentsForClubPayoutAndMarkAsCompleted(ctx context.Context, payoutId string) error
}
