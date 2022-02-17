package ccbill

import "context"

type Repository interface {
	VoidOrRefundSubscription(ctx context.Context, refund *VoidOrRefund) error
	ViewSubscriptionStatus(ctx context.Context, ccbillSubscriptionId string) (*Subscription, error)
	CancelSubscription(ctx context.Context, ccbillSubscriptionId string) error
}
