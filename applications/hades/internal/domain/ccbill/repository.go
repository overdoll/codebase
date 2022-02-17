package ccbill

import "context"

type Repository interface {
	VoidOrRefundCCBillSubscription(ctx context.Context, ccbillSubscriptionId string) error
}
