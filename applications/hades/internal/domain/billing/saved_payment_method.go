package billing

import (
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

type SavedPaymentMethod struct {
	*paging.Node

	accountId     string
	id            string
	paymentMethod *PaymentMethod

	updatedAt time.Time

	ccbillSubscriptionId string
}

func NewSavedPaymentMethodFromCCBill(accountId, ccbillSubscriptionId string, paymentMethod *PaymentMethod) (*SavedPaymentMethod, error) {
	return &SavedPaymentMethod{
		accountId:            accountId,
		id:                   ccbillSubscriptionId,
		paymentMethod:        paymentMethod,
		ccbillSubscriptionId: ccbillSubscriptionId,
		updatedAt:            time.Now(),
	}, nil
}

func (c *SavedPaymentMethod) AccountId() string {
	return c.accountId
}

func (c *SavedPaymentMethod) Id() string {
	return c.id
}

func (c *SavedPaymentMethod) UpdatedAt() time.Time {
	return c.updatedAt
}

func (c *SavedPaymentMethod) CCBillSubscriptionId() string {
	return c.ccbillSubscriptionId
}

func (c *SavedPaymentMethod) IsCCBill() bool {
	return c.ccbillSubscriptionId != ""
}

func (c *SavedPaymentMethod) PaymentMethod() *PaymentMethod {
	return c.paymentMethod
}

func UnmarshalSavedPaymentMethodFromDatabase(accountId, id, ccbillSubscriptionId string, paymentMethod *PaymentMethod, updatedAt time.Time) *SavedPaymentMethod {
	return &SavedPaymentMethod{
		accountId:            accountId,
		id:                   id,
		ccbillSubscriptionId: ccbillSubscriptionId,
		paymentMethod:        paymentMethod,
		updatedAt:            updatedAt,
	}
}

func CanViewAccountSavedPaymentMethods(requester *principal.Principal, accountId string) error {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}
