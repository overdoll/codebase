package ccbill

import (
	"overdoll/libraries/principal"
)

type ChargeByPreviousClubSupporterPaymentUrl struct {
	clubId               string
	accountId            string
	ccbillSubscriptionId string
}

func NewChargeByPreviousClubSupporterPaymentUrl(requester *principal.Principal, clubId, ccbillSubscriptionId string) (*ChargeByPreviousClubSupporterPaymentUrl, error) {
	return &ChargeByPreviousClubSupporterPaymentUrl{
		clubId:               clubId,
		accountId:            requester.AccountId(),
		ccbillSubscriptionId: ccbillSubscriptionId,
	}, nil
}

func (c *ChargeByPreviousClubSupporterPaymentUrl) ClubId() string {
	return c.clubId
}

func (c *ChargeByPreviousClubSupporterPaymentUrl) AccountId() string {
	return c.accountId
}

func (c *ChargeByPreviousClubSupporterPaymentUrl) GenerateUrl() (string, error) {

	// https://bill.ccbill.com/jpost/billingApi.cgi?clientAccnum=900000&username=testuser&password=testpass&action=chargeByPreviousTransactionId&newClientAccnum=900000&newClientSubacc=0005&sharedAuthentication=1&initialPrice=5.00&initialPeriod=30&recurringPrice=29.95&recurringPeriod=30&rebills=99&subscriptionId=0102751901000023384&currencyCode=840

	return "", nil
}
