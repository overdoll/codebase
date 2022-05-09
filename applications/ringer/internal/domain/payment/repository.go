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
	RemoveClubPaymentsFromClubReadyList(ctx context.Context, clubId string, paymentIds []string) error
	ScanClubReadyPaymentsList(ctx context.Context, clubId string, scanFn func(paymentId string, amount uint64, isDeduction bool, currency money.Currency)) error
	ScanClubPaymentsListForPayout(ctx context.Context, payoutId string, scanFn func(paymentIds []string) error) error
	AddClubPaymentsToPayout(ctx context.Context, payoutId string, paymentIds []string) error
	UpdateClubPaymentsCompleted(ctx context.Context, paymentIds []string) error

	DeleteAndRecreateClubPaymentsIndex(ctx context.Context) error
	SearchClubPayments(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *ClubPaymentsFilters) ([]*ClubPayment, error)
}
