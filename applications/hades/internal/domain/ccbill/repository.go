package ccbill

import "context"

type Repository interface {
	VoidSubscription(ctx context.Context, ccbillSubscriptionId string) error
	RefundSubscription(ctx context.Context, refund *Refund) error
	VoidOrRefundSubscription(ctx context.Context, ccbillSubscriptionId string) error
	ViewSubscriptionStatus(ctx context.Context, ccbillSubscriptionId string) (*SubscriptionStatus, error)
	CancelSubscription(ctx context.Context, ccbillSubscriptionId string) error
	ExtendSubscription(ctx context.Context, ccbillSubscriptionId string, days int) error
	ChargeByPreviousTransactionId(ctx context.Context, chargeByPrevious *ChargeByPreviousClubSupporterPaymentUrl) (*string, error)
}
