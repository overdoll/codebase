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

	updatedAt time.Time
}

func NewCCBillSubscription(accountId, clubId, ccbillSubscriptionId string, paymentMethod *PaymentMethod) (*CCBillSubscription, error) {
	return &CCBillSubscription{
		accountId:            accountId,
		clubId:               clubId,
		paymentMethod:        paymentMethod,
		ccbillSubscriptionId: ccbillSubscriptionId,
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

func UnmarshalCCBillSubscriptionFromDatabase(accountId, clubId, ccbillSubscriptionId string, paymentMethod *PaymentMethod, updatedAt time.Time) *CCBillSubscription {
	return &CCBillSubscription{
		accountId:            accountId,
		clubId:               clubId,
		paymentMethod:        paymentMethod,
		ccbillSubscriptionId: ccbillSubscriptionId,
		updatedAt:            updatedAt,
	}
}
