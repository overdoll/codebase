package billing

import (
	"errors"
	"overdoll/libraries/paging"
	"time"
)

var (
	ErrCCBillSubscriptionNotFound = errors.New("ccbill subscription not found")
)

type CCBillSubscription struct {
	*paging.Node

	accountId string
	clubId    string

	paymentMethod *PaymentMethod

	ccbillSubscriptionId string

	idempotencyKey string

	updatedAt time.Time
}

func NewCCBillSubscription(accountId, clubId, ccbillSubscriptionId string, paymentMethod *PaymentMethod, idempotencyKey string) (*CCBillSubscription, error) {
	return &CCBillSubscription{
		accountId:            accountId,
		clubId:               clubId,
		paymentMethod:        paymentMethod,
		ccbillSubscriptionId: ccbillSubscriptionId,
		idempotencyKey:       idempotencyKey,
		updatedAt:            time.Now(),
	}, nil
}

func (c *CCBillSubscription) AccountId() string {
	return c.accountId
}

func (c *CCBillSubscription) ClubId() string {
	return c.clubId
}

func (c *CCBillSubscription) UpdatedAt() time.Time {
	return c.updatedAt
}

func (c *CCBillSubscription) PaymentMethod() *PaymentMethod {
	return c.paymentMethod
}

func (c *CCBillSubscription) CCBillSubscriptionId() string {
	return c.ccbillSubscriptionId
}

func (c *CCBillSubscription) IdempotencyKey() string {
	return c.idempotencyKey
}

func (c *CCBillSubscription) UpdatePaymentMethod(paymentMethod *PaymentMethod) error {
	c.paymentMethod = paymentMethod
	return nil
}

func UnmarshalCCBillSubscriptionFromDatabase(accountId, clubId, ccbillSubscriptionId string, paymentMethod *PaymentMethod, updatedAt time.Time, idempotencyKey string) *CCBillSubscription {
	return &CCBillSubscription{
		accountId:            accountId,
		clubId:               clubId,
		paymentMethod:        paymentMethod,
		ccbillSubscriptionId: ccbillSubscriptionId,
		updatedAt:            updatedAt,
		idempotencyKey:       idempotencyKey,
	}
}
