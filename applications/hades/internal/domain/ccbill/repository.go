package ccbill

import "context"

type Repository interface {
	VoidTransaction(ctx context.Context, ccbillTransactionId string) error
	RefundTransaction(ctx context.Context, refund *Refund) error
	ViewSubscriptionStatus(ctx context.Context, ccbillSubscriptionId string) (*SubscriptionStatus, error)
	CancelSubscription(ctx context.Context, ccbillSubscriptionId string) error
	ExtendSubscription(ctx context.Context, ccbillSubscriptionId string, days int) error
	ChargeByPreviousTransactionId(ctx context.Context, chargeByPrevious *ChargeByPreviousClubSupporterPaymentUrl) (*string, error)
}
