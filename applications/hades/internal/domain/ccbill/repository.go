package ccbill

import "context"

type Repository interface {
	VoidOrRefundSubscription(ctx context.Context, refund *VoidOrRefund) error
	ViewSubscriptionStatus(ctx context.Context, ccbillSubscriptionId string) (*SubscriptionStatus, error)
	CancelSubscription(ctx context.Context, ccbillSubscriptionId string) error
	ExtendSubscription(ctx context.Context, ccbillSubscriptionId string, days int) error
	ChargeByPreviousTransactionId(ctx context.Context, chargeByPrevious *ChargeByPreviousClubSupporterPaymentUrl) (*string, error)
}
