package billing

import (
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SavedPaymentMethod struct {
	*paging.Node

	accountId     string
	id            string
	paymentMethod *PaymentMethod

	ccbillSubscriptionId string
}

func NewSavedPaymentMethodFromCCBill(accountId, ccbillSubscriptionId string, paymentMethod *PaymentMethod) (*SavedPaymentMethod, error) {
	return &SavedPaymentMethod{
		accountId:            accountId,
		id:                   ccbillSubscriptionId,
		paymentMethod:        paymentMethod,
		ccbillSubscriptionId: ccbillSubscriptionId,
	}, nil
}

func (c *SavedPaymentMethod) AccountId() string {
	return c.accountId
}

func (c *SavedPaymentMethod) Id() string {
	return c.id
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

func UnmarshalSavedPaymentMethodFromDatabase(accountId, id, ccbillSubscriptionId string, paymentMethod *PaymentMethod) *SavedPaymentMethod {
	return &SavedPaymentMethod{
		accountId:            accountId,
		id:                   id,
		ccbillSubscriptionId: ccbillSubscriptionId,
		paymentMethod:        paymentMethod,
	}
}

func CanViewAccountSavedPaymentMethods(requester *principal.Principal, accountId string) error {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}
