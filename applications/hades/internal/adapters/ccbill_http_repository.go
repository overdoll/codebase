package adapters

import (
	"context"
	"net/http"
)

type CCBillHttpRepository struct {
	client *http.Client
}

// NewCCBillHttpRepository https://ccbill.com/doc/ccbill-api-guide docs
func NewCCBillHttpRepository(client *http.Client) CCBillHttpRepository {
	return CCBillHttpRepository{client: client}
}

func (r CCBillHttpRepository) VoidOrRefundCCBillSubscription(ctx context.Context, ccbillSubscriptionId string) error {
	return nil
}
