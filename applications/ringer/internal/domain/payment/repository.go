package payment

import (
	"context"
	"overdoll/libraries/money"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetPlatformFeeForClub(ctx context.Context, requester *principal.Principal, clubId string) (*ClubPlatformFee, error)
	GetPlatformFeeForClubOperator(ctx context.Context, clubId string) (*ClubPlatformFee, error)
	CreateNewClubPayment(ctx context.Context, payment *ClubPayment) error
	GetClubPaymentById(ctx context.Context, requester *principal.Principal, paymentId string) (*ClubPayment, error)
	GetClubPaymentByIdOperator(ctx context.Context, paymentId string) (*ClubPayment, error)
	GetClubPaymentByAccountTransactionId(ctx context.Context, accountTransactionId string) (*ClubPayment, error)
	UpdateClubPaymentStatus(ctx context.Context, paymentId string, updateFn func(pay *ClubPayment) error) (*ClubPayment, error)
	UpdateClubPaymentPayoutId(ctx context.Context, paymentId string, updateFn func(pay *ClubPayment) error) (*ClubPayment, error)
	UpdateClubPlatformFee(ctx context.Context, requester *principal.Principal, clubId string, updateFn func(fee *ClubPlatformFee) error) (*ClubPlatformFee, error)
	AddClubPaymentToClubReadyList(ctx context.Context, payment *ClubPayment) error
	ScanClubReadyPaymentsList(ctx context.Context, clubId string, scanFn func(paymentId string, amount int64, isDeduction bool, currency money.Currency)) error
	ScanClubPaymentsListForPayout(ctx context.Context, payoutId string, scanFn func(paymentIds []string) error) error
	AddClubPaymentsToPayout(ctx context.Context, payoutId string, paymentIds []string) error
	UpdateClubPaymentsCompleted(ctx context.Context, paymentIds []string) error
}

type IndexRepository interface {
	SearchClubPayments(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *ClubPaymentsFilters) ([]*ClubPayment, error)
	IndexAllClubPayments(ctx context.Context) error
	DeleteClubPaymentsIndex(ctx context.Context) error
	IndexClubPayment(ctx context.Context, pay *ClubPayment) error
	UpdateIndexClubPaymentsCompleted(ctx context.Context, paymentIds []string) error
}
