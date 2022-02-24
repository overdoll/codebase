package billing

import (
	"errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

var (
	ErrAccountSavedPaymentMethodNotFound = errors.New("account saved payment method not found")
)

type SavedPaymentMethod struct {
	*paging.Node

	accountId string
	id        string
	currency  Currency

	paymentMethod *PaymentMethod

	updatedAt time.Time

	ccbillSubscriptionId string
}

func NewSavedPaymentMethodFromCCBill(accountId, ccbillSubscriptionId string, paymentMethod *PaymentMethod, currency string) (*SavedPaymentMethod, error) {
	cr, _ := CurrencyFromString(currency)
	return &SavedPaymentMethod{
		accountId:            accountId,
		id:                   ccbillSubscriptionId,
		currency:             cr,
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

func (c *SavedPaymentMethod) Currency() Currency {
	return c.currency
}

func (c *SavedPaymentMethod) UpdatePaymentMethod(paymentMethod *PaymentMethod) error {
	c.paymentMethod = paymentMethod
	c.updatedAt = time.Now()
	return nil
}

func (c *SavedPaymentMethod) CanView(requester *principal.Principal) error {
	return requester.BelongsToAccount(c.accountId)
}

func (c *SavedPaymentMethod) CanDelete(requester *principal.Principal) error {
	return requester.BelongsToAccount(c.accountId)
}

func UnmarshalSavedPaymentMethodFromDatabase(accountId, id, ccbillSubscriptionId string, paymentMethod *PaymentMethod, updatedAt time.Time, currency string) *SavedPaymentMethod {
	cr, _ := CurrencyFromString(currency)
	return &SavedPaymentMethod{
		accountId:            accountId,
		id:                   id,
		currency:             cr,
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
